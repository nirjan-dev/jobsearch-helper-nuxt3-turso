import {
  useNkAuth,
  defineNuxtRouteMiddleware,
  useRequestFetch,
} from "#imports";

export default defineNuxtRouteMiddleware(async function setUserMiddleware() {
  const user = useNkAuth().getNkAuthUser();
  const data = await useRequestFetch()("/api/nk-auth/user");

  if (data) {
    user.value = data;
  }
});
