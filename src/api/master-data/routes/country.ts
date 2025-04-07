export default {
  routes: [
    {
      method: "GET",
      path: "/master-data/country",
      handler: "country.getCountries",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
