import { Policy } from "./Policy";
import { SaferPolicy } from "./SaferPolicyResponse";

export function mapSaferPolicy(saferPolicy: SaferPolicy): Policy {
  return new Policy({
    idDyn: saferPolicy.idDyn,
    productName: saferPolicy.productName,
    product: {
      priceList: {
        idDyn: saferPolicy.product.priceList.idDyn,
        name: saferPolicy.product.priceList.name,
        priceListParamsList: saferPolicy.product.priceList.priceListParamsList,
      },
    },
  });
}
