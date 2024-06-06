import { generateCodeVerifier, generateState } from "arctic";
import { defineEventHandler, sendRedirect, setCookie, createError } from "h3";
import { getOAuthClient } from "~/modules/nkAuth/lib/oAuthLoginHelpers";

export default defineEventHandler(async function googleOauthHandler(event) {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

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

  const url = await googleOAuthClient.createAuthorizationURL(
    state,
    codeVerifier,
    {
      scopes: ["profile", "email"],
    },
  );

  setCookie(event, "google_oauth_state", state, {
    path: "/",
    secure: !process.env.development,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  setCookie(event, "google_code_verifier", codeVerifier, {
    secure: !process.env.development,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
    path: "/",
  });

  return sendRedirect(event, url.toString());
});
