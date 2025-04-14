interface GetPolicyParams {
  numberOfPax: number;
  numberOfDays: number;
}

interface GetPolicyResponse {
  policy: {
    id: number;
    name: string;
    description: string;
    price: number;
    currency: string;
    coverage: string;
    exclusions: string[];
    conditions: string[];
    assistance: string[];
  };
}

const AM_RECEPTIVO_AMURA_21_ID = 24919;

export default {
  async getPolicy(ctx) {
    const params = ctx.request.query as GetPolicyParams;

    try {
      const policy = await strapi
        .service("api::policy.policy")
        .getPolicy({ id: AM_RECEPTIVO_AMURA_21_ID, ...params });

      ctx.body = {
        policy,
      } as GetPolicyResponse;
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
