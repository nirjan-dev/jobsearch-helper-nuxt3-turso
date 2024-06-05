import { defineEventHandler } from "h3";
import { lucia } from "~/modules/nkAuth/lib/lucia";

export default defineEventHandler(async function logOut(event) {
  if (!event.context.session) {
    throw createError({
      status: 403,
      message: "Not logged in",
    });
  }

  await lucia.invalidateSession(event.context.session.id);
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createBlankSessionCookie().serialize(),
  );
});
