/* eslint-disable complexity */
import { H3Event } from "h3";
import type { GitHub, Google } from "arctic";
import { getGithubClient } from "~/modules/nkAuth/lib/providers/github";
import type { Provider } from "~/modules/nkAuth";
import { useRuntimeConfig, createError } from "#imports";
import { getGoogleClient } from "~/modules/nkAuth/lib/providers/google";
import { lucia } from "~/modules/nkAuth/lib/lucia";

export function isCookieStateAndQueryParamStateDifferent(
  event: H3Event,
  state: string | undefined,
  provider: Provider,
) {
  const storedState = getCookie(event, `${provider}_oauth_state`);

  return !state || !storedState || state !== storedState;
}

export function getOAuthClient(provider: "github"): GitHub;
export function getOAuthClient(provider: "google"): Google;
export function getOAuthClient(provider: Provider) {
  const oAuthConfig = useRuntimeConfig().oauth;

  // eslint-disable-next-line security/detect-object-injection
  const config = oAuthConfig[provider];

  if (!config || !config.clientId || !config.clientSecret) {
    throw createError({
      message: `${provider} OAuth credentials are not configured`,
      statusCode: 500,
    });
    return;
  }

  switch (provider) {
    case "google":
      return getGoogleClient(config.clientId, config.clientSecret);
      break;
    case "github":
      return getGithubClient(config.clientId, config.clientSecret);
      break;
    default:
      throw createError({
        message: `unknown oAuth ${provider} selected`,
        statusCode: 500,
      });
  }
}

export async function setUserSession(userId: string, event: H3Event) {
  const session = await lucia.createSession(userId, {});
  appendHeader(
    event,
    "Set-Cookie",
    lucia.createSessionCookie(session.id).serialize(),
  );
}
