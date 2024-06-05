import type { User } from "lucia";

export const useUser = function userComposable() {
  return useState<User | null>("user", function initialUserState() {
    return null;
  });
};

export const logOut = function logOutComposable() {
  return async function logOut() {
    await $fetch("/api/auth/logout", {
      method: "POST",
    });
    await navigateTo("/login");
  };
};
