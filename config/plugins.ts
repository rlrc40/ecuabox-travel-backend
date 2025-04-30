export default ({ env }) => ({
  // ...
  email: {
    config: {
      provider: "sendgrid",
      providerOptions: {
        apiKey: env("SENDGRID_API_KEY"),
      },
      settings: {
        defaultFrom: "hello@waycare.es",
        defaultReplyTo: "hello@waycare.es",
      },
    },
  },
  // ...
});
