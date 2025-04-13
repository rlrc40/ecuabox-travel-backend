import { SaferPolicyResponse } from "./SaferPolicyResponse";

type PolicyDurationPrice = {
  id: number;
  name: string;
  minRange: number;
  maxRange: number;
};

export class Policy {
  id: number;
  name: string;
  durationPriceList: PolicyDurationPrice[];

  constructor(params: SaferPolicyResponse) {
    this.id = params.idDyn;
    this.name = params.productName;
    this.durationPriceList = params.product.priceList.priceListParamsList
      .filter((p) => p.paramType.toLocaleUpperCase() === "DURATION")
      .map((p) => ({
        id: p.idDyn,
        name: p.name,
        minRange: p.priceListParamsValuesList[0].minRange,
        maxRange: p.priceListParamsValuesList[0].maxRange,
      }));
  }
}
