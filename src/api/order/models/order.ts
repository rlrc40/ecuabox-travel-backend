export default interface Order {
  stripeId: string;
  paymentStatus: "pending" | "paid" | "failed";
  data: object;
}
