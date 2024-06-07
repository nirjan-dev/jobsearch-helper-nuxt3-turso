import { OAuth2RequestError } from "arctic";
import {
  getOAuthClient,
  isCookieStateAndQueryParamStateDifferent,
  setUserSession,
} from "~/modules/nkAuth/lib/oAuthLoginHelpers";
import {
  createNewUser,
  getExistingUserFromEmail,
  updateUserOauthProvider,
} from "~/modules/nkAuth/lib/dbHelpers";

interface googleUser {
  sub: string;
  name: string;
  email: string;
  email_verified: boolean;
}

// eslint-disable-next-line complexity, max-lines-per-function
export default defineEventHandler(async function googleCallbackHandler(event) {
  const query = getQuery(event);
  const code = query.code?.toString();
  const state = query.state?.toString();
  const storedCodeVerifier = getCookie(event, "google_code_verifier");

  if (!storedCodeVerifier) {
    throw createError({
      status: 400,
      message: "Invalid code verifier on google callback",
    });
  }

  if (!code) {
    throw createError({
      status: 400,
      message: "Invalid code on google callback",
    });
  }

  if (isCookieStateAndQueryParamStateDifferent(event, state, "google")) {
    throw createError({
      status: 400,
      message: "Invalid state on google callback",
    });
  }

  let googleOAuthClient;

  try {
    googleOAuthClient = getOAuthClient("google");
    if (!googleOAuthClient) {
      throw createError({
        status: 500,
        message: "OAuth client not found",
      });
    }
  } catch (error) {
    throw createError({
      status: 500,
      message: "google OAuth credentials are not configured",
      cause: error,
    });
  }

  let dbUser;
  try {
    const tokens = await googleOAuthClient.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );

    const googleUser: googleUser = await $fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      },
    );

    dbUser = await getExistingUserFromEmail(googleUser.email);

    if (!dbUser) {
      if (!googleUser.email_verified) {
        throw createError({
          status: 400,
          message: "Email not verified",
        });
      }

      dbUser = await createNewUser({
        id: googleUser.sub,
        email: googleUser.email,
        provider: "google",
      });
    }

    if (dbUser.oauthProviderId !== googleUser.sub) {
      try {
        await updateUserOauthProvider(dbUser.id, googleUser.sub, "google");
      } catch (error) {
        throw createError({
          status: 500,
          message: "Something went wrong on updating user oauth provider",
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
      message: "Something went wrong on google callback",
      cause: e,
    });
  }

  await setUserSession(dbUser.id, event);
  return sendRedirect(event, "/");
});
