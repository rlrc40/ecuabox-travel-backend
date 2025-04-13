export default {
  async getPolicy(ctx) {
    try {
      const policyId = ctx.params.id;

      const policy = await strapi
        .service("api::policy.policy")
        .getPolicy(policyId);

      ctx.body = {
        policy,
      };
    } catch (err) {
      console.error("Error fetching policy:", err);

      ctx.body = {
        error: "An error occurred while fetching policy data",
        details: err instanceof Error ? err.message : "Unknown error",
      };
      ctx.status = 500;
    }
  },
};
