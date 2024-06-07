import { OAuth2RequestError } from "arctic";

import {
  createNewUser,
  getExistingUserFromEmail,
  updateUserOauthProvider,
} from "~/modules/nkAuth/lib/dbHelpers";
import {
  getOAuthClient,
  isCookieStateAndQueryParamStateDifferent,
  setUserSession,
} from "~/modules/nkAuth/lib/oAuthLoginHelpers";

interface GithubUser {
  id: string;
  login: string;
  email: string;
}

// eslint-disable-next-line complexity, max-lines-per-function
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

  if (isCookieStateAndQueryParamStateDifferent(event, state, "github")) {
    throw createError({
      status: 400,
      message: "Invalid state on github callback",
    });
  }

  let githubOAuthClient;

  try {
    githubOAuthClient = getOAuthClient("github");
    if (!githubOAuthClient) {
      throw createError({
        status: 500,
        message: "OAuth client not found",
      });
    }
  } catch (error) {
    throw createError({
      status: 500,
      message: "Github OAuth credentials are not configured",
      cause: error,
    });
  }

  let dbUser;

  try {
    const tokens = await githubOAuthClient.validateAuthorizationCode(code);

    const githubUser: GithubUser = await $fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });

    dbUser = await getExistingUserFromEmail(githubUser.email);

    if (!dbUser) {
      dbUser = await createNewUser({
        id: githubUser.id,
        email: githubUser.email,
        provider: "github",
      });
    }

    if (dbUser.oauthProviderId !== githubUser.id) {
      try {
        await updateUserOauthProvider(dbUser.id, githubUser.id, "github");
      } catch (error) {
        throw createError({
          status: 500,
          message:
            "Something went wrong on updating existing user's provider ID",
          cause: error,
        });
      }
    }
  } catch (e) {
    if (e instanceof OAuth2RequestError) {
      throw createError({
        status: 400,
        message: e.message,
      });
    }

    throw createError({
      status: 500,
      message: "Something went wrong on github callback",
      cause: e,
    });
  }

  await setUserSession(dbUser.id, event);
  return sendRedirect(event, "/");
});
