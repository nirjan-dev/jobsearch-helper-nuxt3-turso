import {
  useLogger,
  defineNuxtModule,
  createResolver,
  addImportsDir,
  addServerScanDir,
  addRouteMiddleware,
} from "nuxt/kit";

// dependencies: lucia, @lucia-auth/adapter-drizzle, arctic, drizzle-orm
export default defineNuxtModule({
  meta: {
    name: "nkAuth",
    configKey: "nkAuth",
    compatibility: {
      nuxt: "^3.0.0",
    },
    version: "0.1.0",
  },

  setup(moduleOptions, _nuxt) {
    const logger = useLogger("nkAuth");
    logger.info("Setting up nkAuth");

    if (moduleOptions.providers.includes("github")) {
      const githubClientID = process.env.NUXT_OAUTH_GITHUB_CLIENT_ID;
      const githubClientSecret = process.env.NUXT_OAUTH_GITHUB_CLIENT_SECRET;

      if (!githubClientID || !githubClientSecret) {
        logger.error(
          "Github OAuth credentials are not configured. Please set NUXT_OAUTH_GITHUB_CLIENT_ID and NUXT_OAUTH_GITHUB_CLIENT_SECRET in your .env file",
        );
      }
    }

    const resolver = createResolver(import.meta.url);

    addImportsDir(resolver.resolve("./runtime/composables"));
    addServerScanDir(resolver.resolve("./runtime/server"));

    addRouteMiddleware({
      name: "01nkAuthSetUser",
      global: true,
      path: resolver.resolve("./runtime/middleware/01.nkAuthSetUser.global"),
    });

    addRouteMiddleware({
      name: "nkAuthGuard",
      global: false,
      path: resolver.resolve("./runtime/middleware/nkAuthGuard"),
    });
  },
});
