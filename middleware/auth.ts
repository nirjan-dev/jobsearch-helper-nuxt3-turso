export default defineNuxtRouteMiddleware(
  // eslint-disable-next-line require-await
  async function authMiddleware(_to, _from) {
    const user = useUser();

    if (!user.value) return navigateTo("/login", { replace: true });
  },
);
