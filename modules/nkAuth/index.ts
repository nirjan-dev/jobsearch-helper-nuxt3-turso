import {
  useLogger,
  defineNuxtModule,
  createResolver,
  addImportsDir,
  addServerScanDir,
  addRouteMiddleware,
} from "nuxt/kit";

export type Provider = "google" | "github";

export interface NkAuthModuleOptions {
  providers: Provider[];
}

// dependencies: lucia, @lucia-auth/adapter-drizzle, arctic, drizzle-orm
export default defineNuxtModule<NkAuthModuleOptions>({
  meta: {
    name: "nkAuth",
    configKey: "nkAuth",
    compatibility: {
      nuxt: "^3.0.0",
    },
    version: "0.2.0",
  },

  setup(moduleOptions, _nuxt) {
    const logger = useLogger("nkAuth");
    logger.info("Setting up nkAuth");

    moduleOptions.providers.forEach(
      function validateProviderCredentials(provider) {
        logger.info(`Enabling ${provider} OAuth provider`);

        const providerClientID =
          process.env[`NUXT_OAUTH_${provider.toUpperCase()}_CLIENT_ID`];
        const providerClientSecret =
          process.env[`NUXT_OAUTH_${provider.toUpperCase()}_CLIENT_SECRET`];

        if (!providerClientID || !providerClientSecret) {
          logger.error(
            `${provider} OAuth credentials are not configured. Please set NUXT_OAUTH_${provider.toUpperCase()}_CLIENT_ID and NUXT_OAUTH_${provider.toUpperCase()}_CLIENT_SECRET in your .env file`,
          );
        }
      },
    );

    if (!process.env.NUXT_CLIENT_URL) {
      logger.error(
        "NUXT_CLIENT_URL is not configured. Please set it in your .env file",
      );
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
