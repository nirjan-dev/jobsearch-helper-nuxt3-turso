import { H3Event } from "h3";
import { OAuth2RequestError } from "arctic";
import { eq } from "drizzle-orm";
import { lucia } from "~/modules/nkAuth/lib/lucia";
import { getGithubClient } from "~/modules/nkAuth/lib/providers/github";
import { useRuntimeConfig } from "#imports";
import { db, usersTable } from "~/server/utils/nkAuthDBAdapter";

interface GithubUser {
  id: string;
  login: string;
  email: string;
}

// eslint-disable-next-line complexity
export default defineEventHandler(async function githubCallbackHandler(event) {
  const query = getQuery(event);
  const code = query.code?.toString();
  const state = query.state?.toString();

  if (!code) {
    throw createError({
      status: 400,
      message: "Invalid code on github callback",
    });
  }

  if (isCookieStateAndQueryParamStateDifferent(event, state)) {
    throw createError({
      status: 400,
      message: "Invalid state on github callback",
    });
  }

  const oAuthConfig = useRuntimeConfig().oauth;

  const githubConfig = oAuthConfig.github;
  if (!githubConfig || !githubConfig.clientId || !githubConfig.clientSecret) {
    createError({
      statusCode: 500,
      statusMessage: "Github OAuth credentials are not configured",
    });
    return;
  }

  const githubOAuthClient = getGithubClient(
    githubConfig.clientId,
    githubConfig.clientSecret,
  );

  try {
    const tokens = await githubOAuthClient.validateAuthorizationCode(code);

    const githubUser: GithubUser = await $fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    const existingUser = await checkExistingUser(githubUser);

    if (!existingUser) {
      const userId = crypto.randomUUID();

      await createNewUser(userId, githubUser);
      setUserSession(userId, event);
    } else {
      setUserSession(existingUser.id, event);
    }
    return sendRedirect(event, "/");
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      throw createError({
        status: 400,
        message: e.message,
      });
    }

    console.error(e);

    throw createError({
      status: 500,
      message: "Something went wrong on github callback",
      cause: e,
    });
  }
});

async function createNewUser(userId: string, githubUser: GithubUser) {
  await db.insert(usersTable).values({
    id: userId,
    oauthProviderId: githubUser.id,
    email: githubUser.email,
    createdAt: new Date(),
  });
}

async function checkExistingUser(githubUser: GithubUser) {
  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.oauthProviderId, githubUser.id))
    .get();
}

async function setUserSession(userId: string, event: H3Event) {
  const session = await lucia.createSession(userId, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize(),
  );
}

function isCookieStateAndQueryParamStateDifferent(
  event: H3Event,
  state: string | undefined,
) {
  const storedState = getCookie(event, "github_oauth_state");

  return !state || !storedState || state !== storedState;
}
