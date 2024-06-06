import { Google } from "arctic";

export function getGoogleClient(clientId: string, clientSecret: string) {
  return new Google(
    clientId,
    clientSecret,
    `${process.env.NUXT_CLIENT_URL}/nk-auth-login/google/callback`,
  );
}
