import {
  defineNuxtModule,
  createResolver,
  extendPages,
  useLogger,
} from "nuxt/kit";

export default defineNuxtModule({
  meta: {
    name: "user",
    configKey: "user",
  },

  setup() {
    const logger = useLogger("user");

    logger.info("Setting up the User Module");

    const { resolve } = createResolver(import.meta.url);

    extendPages(function addUserPages(pages) {
      pages.push({
        name: "login",
        path: "/login",
        file: resolve("./runtime/pages/login.vue"),
      });
    });

    logger.success("Finished setting up the user module");
  },
});
