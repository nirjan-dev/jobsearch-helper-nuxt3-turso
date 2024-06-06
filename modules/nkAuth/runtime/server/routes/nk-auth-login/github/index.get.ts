import { generateState } from "arctic";
import { defineEventHandler, sendRedirect, setCookie, createError } from "h3";
import { getOAuthClient } from "~/modules/nkAuth/lib/oAuthLoginHelpers";

export default defineEventHandler(async function githubOauthHandler(event) {
  const state = generateState();

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

  const url = await githubOAuthClient.createAuthorizationURL(state);

  setCookie(event, "github_oauth_state", state, {
    path: "/",
    secure: !process.env.development,
    httpOnly: true,
    maxAge: 60 * 10,
    sameSite: "lax",
  });

  return sendRedirect(event, url.toString());
});
