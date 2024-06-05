import {
  H3Event,
  defineEventHandler,
  getCookie,
  appendResponseHeader,
  getHeader,
} from "h3";

import { Session, User, verifyRequestOrigin } from "lucia";
import { lucia } from "~/modules/nkAuth/lib/lucia";

export default defineEventHandler(
  // eslint-disable-next-line complexity
  async function serverSetUserSessionMiddleware(event) {
    // checks requests by checking origin and host headers
    if (event.method !== "GET" && !isValidRequest(event)) {
      event.node.res.writeHead(403).end();
      return;
    }

    // default cookie name is "auth_session" unless overridden
    const sessionId = getCookie(event, lucia.sessionCookieName);
    if (!sessionId) {
      setUserAndSession({
        event,
        user: null,
        session: null,
      });
      return;
    }

    // checks is session is valid for a valid user in the database
    const { session, user } = await lucia.validateSession(sessionId);

    // sets new cookie when it needs to be fresh (old session has expired)
    if (session && session.fresh) {
      appendResponseHeader(
        event,
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize(),
      );
    }

    // sets blank cookie if session is not valid
    if (!session) {
      appendResponseHeader(
        event,
        "Set-Cookie",
        lucia.createBlankSessionCookie().serialize(),
      );
    }

    // sets user and session in the context for use in other middleware and requests
    setUserAndSession({
      event,
      user,
      session,
    });
  },
);

declare module "h3" {
  interface H3EventContext {
    user: User | null;
    session: Session | null;
  }
}

function setUserAndSession(options: {
  event: H3Event;
  user: User | null;
  session: Session | null;
}) {
  const { event, user, session } = options;

  event.context.user = user;
  event.context.session = session;
}

function isValidRequest(event: H3Event) {
  const originHeader = getHeader(event, "Origin");
  const hostHeader = getHeader(event, "Host");

  if (!originHeader || !hostHeader) {
    return false;
  }

  // eslint-disable-next-line sonarjs/prefer-single-boolean-return
  if (!verifyRequestOrigin(originHeader, [hostHeader])) {
    return false;
  }

  return true;
}
