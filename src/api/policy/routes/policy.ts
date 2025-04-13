export default {
  routes: [
    {
      method: "GET",
      path: "/policy",
      handler: "policy.getPolicy",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
