export default {
  routes: [
    {
      method: "POST",
      path: "/insurances/new",
      handler: "insurances.create",
      config: {
        policies: [],
        middlewares: [],
      },
    },
    {
      method: "GET",
      path: "/insurances/report",
      handler: "insurances.getReport",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
