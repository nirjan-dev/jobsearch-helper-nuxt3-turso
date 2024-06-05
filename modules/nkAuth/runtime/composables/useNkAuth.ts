import type { User } from "lucia";
import { useState } from "#imports";

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

  type Providers = "google" | "github";

  function getNkAuthLoginLink(provider: Providers) {
    return `/nk-auth-login/${provider}`;
  }

  return {
    getNkAuthUser,
    logoutNkAuthUser,
    getNkAuthLoginLink,
  };
}
