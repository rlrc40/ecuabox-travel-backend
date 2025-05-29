export default interface Order {
  stripeId: string;
  paymentStatus: "pending" | "paid" | "failed";
  data: object;
}

export interface StrapiOrder extends Order {
  documentId: string;
}
