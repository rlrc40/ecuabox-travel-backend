export type SaferPostPolicyResponse = {
  basePrices: { idDyn: number };
  isFlatRate: boolean;
  isPaymentLetter: boolean;
  netPremiumAmount: number; // The base insurance premium – the cost of the insurance coverage excluding commissions, fees, or taxes.
  netRetailPrice: number; // The net retail price – the selling price before taxes, including commissions and additional fees.
  paxRetailPrice: number; // Retail price per traveler – the total retail price divided by the number of travelers (pax).
  retailPriceAmount: number; //Total retail price – the final amount paid by the customer, including all taxes.
  policy: Policy;
  idDyn: number;
  policyId: number;
  priceListId: number;
  priceListParamsValues1: PriceListParamsValue;
  priceListParamsValues2: PriceListParamsValue;
  priceListParamsValues3: PriceListParamsValue;
};

interface Policy {
  idDyn: number;
  policyBranch: string;
  policyNumber: string;
  product: PolicyProduct;
}

interface PolicyProduct {
  productName: string;
  idDyn: number;
}

interface PriceListParamsValue {
  deleteDate: boolean;
  idDyn: number;
  maxRange: number;
  minRange: number;
  name: string;
}
