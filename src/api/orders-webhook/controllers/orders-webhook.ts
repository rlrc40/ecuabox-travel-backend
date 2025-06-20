import { StrapiOrder } from "../../order/models/order";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default {
  async checkoutWebhook(ctx) {
    let data;
    let eventType;
    // Check if webhook signing is configured.
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      // Retrieve the event by verifying the signature using the raw body and secret.
      const signature = ctx.request.headers["stripe-signature"];
      const unparsedBody = ctx.request.body[Symbol.for("unparsedBody")];

      let event;

      console.log(`🔔  Webhook received with signature: ${signature}`);

      try {
        event = stripe.webhooks.constructEvent(
          unparsedBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET
        );
        console.log(`🔔  Webhook event data: ${event.data.object.id}`);
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err);
        return ctx.badRequest(null, err);
      }

      eventType = event.type;
      data = event.data;
    } else {
      // Webhook signing is recommended, but if the secret is not configured in `config.js`,
      // retrieve the event data directly from the request body.
      data = ctx.request.body.data;
      eventType = ctx.request.body.type;
    }

    if (eventType === "checkout.session.completed") {
      console.log(`🔔  Payment received!`);

      const stripeId = data.object.id;
      console.log(`🔔  Webhook event data session id: ${stripeId}`);

      try {
        const sessionOrder: StrapiOrder = await strapi.db
          .query("api::order.order")
          .findOne({
            where: {
              stripeId,
            },
          });

        if (!sessionOrder) {
          return ctx.badRequest("Order not found");
        }

        console.log(`🔔  Order found: `, sessionOrder);

        const updatedOrder = await strapi.documents("api::order.order").update({
          documentId: sessionOrder.documentId,
          data: {
            paymentStatus: "paid",
          },
          status: "published",
        });

        console.log(`🔔  Order updated: ${updatedOrder.id}`);
      } catch (err) {
        console.log(`⚠️  Error updating order: ${err}`);
        return ctx.badRequest("Error updating order", err);
      }
    }

    ctx.send({});
  },
};
