import { SaferPostPolicyResponse } from "./SaferPostPolicyResponse";

export class Policy {
  id: number;
  name: string;
  productId: number;
  productName: string;
  netPremiumAmount: number; // The base insurance premium – the cost of the insurance coverage excluding commissions, fees, or taxes.
  netRetailPrice: number; // The net retail price – the selling price before taxes, including commissions and additional fees.
  paxRetailPrice: number; // Retail price per traveler – the total retail price divided by the number of travelers (pax).
  retailPriceAmount: number; //Total retail price – the final amount paid by the customer, including all taxes.
  priceListParamsValues1: number;
  priceListParamsValues2: number;
  basePrices: { idDyn: number };

  constructor(params: SaferPostPolicyResponse) {
    this.id = params.policy.idDyn;
    this.name = params.policy.policyNumber;
    this.productId = params.policy.product.idDyn;
    this.productName = params.policy.product.productName;
    this.netPremiumAmount = params.netPremiumAmount;
    this.netRetailPrice = params.netRetailPrice;
    this.paxRetailPrice = params.paxRetailPrice;
    this.retailPriceAmount = params.retailPriceAmount;
    this.priceListParamsValues1 = params.priceListParamsValues1.idDyn;
    this.priceListParamsValues2 = params.priceListParamsValues2.idDyn;
    this.basePrices = params.basePrices;
  }
}
