export default defineNuxtRouteMiddleware(
  // eslint-disable-next-line require-await
  async function authMiddleware(_to, _from) {
    const { loggedIn } = useUserSession();
    if (!loggedIn.value) return navigateTo("/login", { replace: true });
  },
);
