interface CreateInsuranceParams {
  numberOfPax: number;
  numberOfDays: number;
}

interface GetInsuranceReportParams {
  id: number;
}

const AM_RECEPTIVO_AMURA_21_ID = 24919;

export default {
  async create(ctx) {
    const params = ctx.request.query as CreateInsuranceParams;

    try {
      const insurance = await strapi
        .service("api::insurances.insurances")
        .getInsurance({ id: AM_RECEPTIVO_AMURA_21_ID, ...params });

      ctx.body = {
        insurance,
      };
    } catch (err) {
      console.error("Error creating insurance:", err);

      ctx.body = {
        error: "An error occurred while creating insurance",
        details: err instanceof Error ? err.message : "Unknown error",
      };
      ctx.status = 500;
    }
  },
  async getReport(ctx) {
    const params = ctx.request.query as GetInsuranceReportParams;

    try {
      const report = await strapi
        .service("api::insurances.insurances")
        .getReport(params.id);

      ctx.body = {
        report,
      };
    } catch (err) {
      console.error("Error fetching report:", err);

      ctx.body = {
        error: "An error occurred while fetching report data",
        details: err instanceof Error ? err.message : "Unknown error",
      };
      ctx.status = 500;
    }
  },
};
