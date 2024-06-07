import { createConsola, consola } from "consola";

export default defineEventHandler(function logglerMiddleware(event) {
  const logger = createConsola({
    level: 3,
    formatOptions: {
      colors: true,
      date: true,
      compact: false,
      columns: 80,
    },
    reporters: [
      {
        log(logObj) {
          consola.log(
            JSON.stringify(
              {
                date: logObj.date,
                type: logObj.type,
                message: logObj.args[0],
              },
              null,
              2,
            ),
          );
        },
      },
    ],
  });

  logger.info({
    type: "request",
    method: event.node.req.method,
    url: event.node.req.url,
    status: event.node.res.statusCode,
    user: event.context.user,
    session: event.context.session,
    params: event.context.params,
    matchedRoute: event.context.matchedRoute,
    location: event.node.req.headers.location,
    host: event.node.req.headers.host,
    userAgent: event.node.req.headers["user-agent"],
    referer: event.node.req.headers.referer,
    statusMessage: event.node.res.statusMessage,
  });
});
