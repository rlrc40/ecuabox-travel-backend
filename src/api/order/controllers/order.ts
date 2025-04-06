const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const {
        amount = 50,
        currency = "eur",
        concept,
        metadata,
      } = ctx.request.body;

      strapi.log.info("Received request to create order", {
        amount,
        currency,
        concept,
        metadata,
      });

      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency,
                product_data: {
                  name: concept,
                },
                unit_amount: amount,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${process.env.FRONTEND_URL}/calculate-your-insurance/step-5?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.FRONTEND_URL}/cancel`,
          metadata,
        });

        strapi.log.info("Stripe session created successfully", {
          sessionId: session.id,
        });

        await strapi.service("api::order.order").create({
          data: {
            stripeId: session.id,
            data: {
              amount,
              currency,
              concept,
              metadata,
            },
          },
        });

        strapi.log.info("Order saved to database", { stripeId: session.id });

        ctx.send({ sessionId: session.id });
      } catch (error) {
        strapi.log.error("Error creating order", { error: error.message });
        ctx.throw(500, error);
      }
    },
  })
);
