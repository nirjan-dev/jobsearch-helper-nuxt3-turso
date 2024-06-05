import { Lucia } from "lucia";
import { nkAuthDBAdapter } from "~/server/utils/nkAuthDBAdapter";

export const lucia = new Lucia(nkAuthDBAdapter, {
  sessionCookie: {
    attributes: {
      secure: !import.meta.dev,
    },
  },
  getUserAttributes: function (attributes) {
    return {
      oauthProviderId: attributes.oauthProviderId,
      email: attributes.email,
    };
  },
});

interface DatabaseUserAttributes {
  oauthProviderId: string;
  email: string;
}

declare module "lucia" {
  interface Register {
    Lucia: typeof Lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}
