type Roles = "basic user" | "premium user";
export type User = {
  name: string;
  email?: string;
  roles?: Roles[];
  id: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterCredentials = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export type ResetPasswordCredentials = {
  email: string;
  password: string;
  password_confirmation: string;
  token: string;
};

// Value set in: ~/plugins/auth.ts
export function useUser<T = User>() {
  return useState<T | undefined | null>("user", () => undefined);
}

// eslint-disable-next-line max-lines-per-function
export function useAuth<T = User>() {
  const router = useRouter();

  const user = useUser<T>();
  const isLoggedIn = computed(function computedIsLoggedIn() {
    return !!user.value;
  });

  async function refresh() {
    try {
      user.value = await fetchCurrentUser();
    } catch {
      user.value = null;
    }
  }

  async function login(credentials: LoginCredentials) {
    if (isLoggedIn.value) return;

    await $larafetch("/login", { method: "post", body: credentials });
    await refresh();
  }

  async function register(credentials: RegisterCredentials) {
    await $larafetch("/register", { method: "post", body: credentials });
    await refresh();
  }

  async function resendEmailVerification() {
    return await $larafetch<{ status: string }>(
      "/email/verification-notification",
      {
        method: "post",
      },
    );
  }

  async function logout() {
    if (!isLoggedIn.value) return;

    await $larafetch("/logout", { method: "post" });
    user.value = null;

    await router.push("/login");
  }

  async function forgotPassword(email: string) {
    return await $larafetch<{ status: string }>("/forgot-password", {
      method: "post",
      body: { email },
    });
  }

  async function resetPassword(credentials: ResetPasswordCredentials) {
    return await $larafetch<{ status: string }>("/reset-password", {
      method: "post",
      body: credentials,
    });
  }

  async function updateProfile(data: Partial<User>) {
    return await $larafetch<User>("/api/profile/update", {
      method: "put",
      body: data,
    });
  }

  const hasSubscription = computed(function computedHasSubscription() {
    const userRoles = (user as unknown as Ref<User>).value?.roles;

    return (
      userRoles?.includes("premium user") || userRoles?.includes("basic user")
    );
  });

  return {
    user,
    isLoggedIn,
    login,
    register,
    resendEmailVerification,
    logout,
    forgotPassword,
    resetPassword,
    refresh,
    updateProfile,
    hasSubscription,
  };
}

export async function fetchCurrentUser<T = User>() {
  try {
    return await $larafetch<T>("/api/user");
  } catch (error: any) {
    if ([401, 419].includes(error?.response?.status)) return null;
    throw error;
  }
}
