import type { User } from "lucia";
import { useState } from "#imports";
import type { Provider } from "~/modules/nkAuth";

function getInitialUserState() {
  return null;
}

export function useNkAuth() {
  function getNkAuthUser() {
    return useState<User | null>("nkUser", getInitialUserState);
  }

  async function logoutNkAuthUser() {
    try {
      await $fetch("/api/nk-auth/logout", {
        method: "POST",
      });

      getNkAuthUser().value = null;
      return true;
    } catch (error) {
      throw createError({
        message: "Error logging out",
        cause: error,
      });
    }
  }

  function getNkAuthLoginLink(provider: Provider) {
    return `/nk-auth-login/${provider}`;
  }

  return {
    getNkAuthUser,
    logoutNkAuthUser,
    getNkAuthLoginLink,
  };
}
