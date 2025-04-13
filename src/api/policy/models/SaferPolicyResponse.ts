export type SaferPolicyResponse = SaferPolicy;

export interface SaferPolicy {
  idDyn: number;
  productName: string;
  product: SaferPolicyProduct;
}

export interface SaferPolicyProduct {
  priceList: SaferPolicyPriceList;
}

export interface SaferPolicyPriceList {
  idDyn: number;
  name: string;
  priceListParamsList: SaferPolicyPriceListParam[];
}

export interface SaferPolicyPriceListParam {
  idDyn: number;
  name: string;
  paramType: string;
  plan: number;
  priceListParamsValuesList: SaferPolicyPriceListValue[];
}

export interface SaferPolicyPriceListValue {
  idDyn: number;
  name: string;
  minRange: number;
  maxRange: number;
}
