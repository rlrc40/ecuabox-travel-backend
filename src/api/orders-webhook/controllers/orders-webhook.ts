const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default {
  async checkoutWebhook(ctx) {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      const rawBody = ctx.request.body[Symbol.for("unparsedBody")];
      const signature = ctx.request.headers["stripe-signature"];

      let event;

      console.log(`🔔  Webhook received with signature: ${signature}`);
      console.log(ctx.request);

      try {
        event = stripe.webhooks.constructEvent(
          rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
        console.log(`🔔  Webhook signature verified.`, event);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err);
        return ctx.badRequest(null, err);
      }
      // Extract the object from the event.
      data = event.data;
      eventType = event.type;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = ctx.request.body.data;
      eventType = ctx.request.body.type;
    }

    if (eventType === "checkout.session.completed") {
      console.log(`🔔  Payment received!`);
    }

    ctx.send({});
  },
};
