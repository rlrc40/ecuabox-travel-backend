export type SaferGetPolicyResponse = {
  idDyn: number;
  productName: string;
  product: SaferPolicyProduct;
};

interface SaferPolicyProduct {
  priceList: SaferPolicyPriceList;
}

interface SaferPolicyPriceList {
  idDyn: number;
  name: string;
  priceListParamsList: SaferPolicyPriceListParam[];
}

interface SaferPolicyPriceListParam {
  idDyn: number;
  name: string;
  paramType: string;
  plan: number;
  priceListParamsValues: SaferPolicyPriceListValue[];
}

interface SaferPolicyPriceListValue {
  idDyn: number;
  name: string;
  minRange: number;
  maxRange: number;
}
