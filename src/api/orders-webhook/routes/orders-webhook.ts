export default {
  routes: [
    {
      method: "POST",
      path: "/orders-webhook",
      handler: "orders-webhook.checkoutWebhook",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
