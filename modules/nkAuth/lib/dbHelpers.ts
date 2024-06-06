import { eq } from "drizzle-orm";
import { db, usersTable } from "~/server/utils/nkAuthDBAdapter";

export async function getExistingUserFromEmail(email: string) {
  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .get();
}

export async function updateUserOauthProvider(
  userID: string,
  providerID: string,
  provider: string,
) {
  await db
    .update(usersTable)
    .set({ oauthProviderId: providerID, oauthProvider: provider })
    .where(eq(usersTable.id, userID));
}

export async function createNewUser(userData: {
  id: string;
  email: string;
  provider: string;
}) {
  const userId = crypto.randomUUID();
  return await db
    .insert(usersTable)
    .values({
      id: userId,
      oauthProviderId: userData.id,
      email: userData.email,
      oauthProvider: userData.provider,
      createdAt: new Date(),
    })
    .returning()
    .get();
}
