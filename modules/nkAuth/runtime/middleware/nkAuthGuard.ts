import { useNkAuth, navigateTo, defineNuxtRouteMiddleware } from "#imports";

export default defineNuxtRouteMiddleware(function guardMiddleware() {
  const user = useNkAuth().getNkAuthUser();

  if (!user?.value) {
    return navigateTo("/login");
  }
});
