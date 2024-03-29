export default defineNuxtPlugin(async function authPlugin(_nuxtApp) {
  const user = useUser();

  if (user.value !== undefined) return;

  user.value = await fetchCurrentUser();
});
