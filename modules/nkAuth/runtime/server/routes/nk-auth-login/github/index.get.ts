import { generateState } from "arctic";
import { defineEventHandler, sendRedirect, setCookie, createError } from "h3";
import { getGithubClient } from "~/modules/nkAuth/lib/providers/github";
import { useRuntimeConfig } from "#imports";

export default defineEventHandler(async function githubOauthHandler(event) {
  const state = generateState();

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
