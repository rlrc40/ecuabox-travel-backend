export default {
  routes: [
    {
      method: "GET",
      path: "/policies",
      handler: "policies.getPolicy",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
