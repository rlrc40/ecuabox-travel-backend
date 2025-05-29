const getRawBody = require("raw-body");

export default {
  routes: [
    {
      method: "POST",
      path: "/orders-webhook",
      handler: "orders-webhook.checkoutWebhook",
      config: {
        policies: [],
        middlewares: [
          async (ctx, next) => {
            if (ctx.request.url.startsWith("/api/orders-webhook")) {
              ctx.request.rawBody = await getRawBody(ctx.req, {
                length: ctx.request.length,
                limit: "1mb",
                encoding: ctx.request.charset || "utf-8",
              });
            }
            await next();
          },
        ],
      },
    },
  ],
};
