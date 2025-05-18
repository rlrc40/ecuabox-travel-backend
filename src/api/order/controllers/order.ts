const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

import { factories } from "@strapi/strapi";
import NewOrder from "../models/new-order";
import Order from "../models/order";

export default factories.createCoreController(
  "api::order.order",
  ({ strapi }) => ({
    async create(ctx) {
      const newOrder = ctx.request.body as NewOrder;

      strapi.log.info("Received request to create order", newOrder);

      try {
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: newOrder.currency,
                product_data: {
                  name: newOrder.concept,
                },
                unit_amount: newOrder.amount,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `${process.env.FRONTEND_URL}/calculate-your-insurance/step-5?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.FRONTEND_URL}/cancel`,
          metadata: newOrder.metadata,
        });

        strapi.log.info("Stripe session created successfully", {
          sessionId: session.id,
        });

        const order: Order = {
          stripeId: session.id,
          paymentStatus: "pending",
          data: {
            ...newOrder,
          },
        };

        console.log("New order:", order);

        await strapi.service("api::order.order").create({
          data: order,
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
