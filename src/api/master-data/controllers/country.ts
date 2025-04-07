export default {
  async getCountries(ctx) {
    try {
      console.log("Fetching countries...");

      const countries = await strapi
        .service("api::master-data.country")
        .getCountries();

      ctx.body = {
        countries,
      };
    } catch (err) {
      console.error("Error fetching countries:", err);

      ctx.body = {
        error: "An error occurred while fetching the summary data",
        details: err instanceof Error ? err.message : "Unknown error",
      };
      ctx.status = 500;
    }
  },
};
