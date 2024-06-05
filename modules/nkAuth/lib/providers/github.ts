import { GitHub } from "arctic";

export function getGithubClient(clientId: string, clientSecret: string) {
  return new GitHub(clientId, clientSecret);
}
