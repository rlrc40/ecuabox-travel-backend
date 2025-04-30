export interface SaferCreateInsuranceResponse {
  id: number;
  idDyn: number | null;
  bookingReference1: string;
  bookingReference2: string | null;
  bookingReference3: string | null;
  unsuscribeDate: string;
  effectDate: string;
  entryDate: string;
  budgetCreationDate: string | null;
  budgetUnsuscribeDate: string | null;
  policy: Policy;
  budget: boolean;
  flags: Flag[];
  isClaimable: boolean | null;
  isPaymentLetter: boolean | null;
  netPayment: number | null;
  taxTotalAmount: number;
  totalAmount: number;
  totalAmountNoExtensions: number;
  clientComissionAmount: number;
  netRetailPrice: number;
  netPremiumAmount: number;
  coverageExtensionsAmount: number;
  companyAmount: number;
  generalSituation: string;
  paymentMethod: string;
  relatedInsurancesId: number | null;
  reasonDischargeId: number;
  quotePresetList: QuotePreset[];
  insuranceInsuredList: InsuranceInsured[];
  expirationDate: string | null;
  status: number;
  hash: string | null;
}

interface Policy {
  idDyn: number;
  policyNumber: string;
  policyStatus: string;
  isContractable: boolean;
  product: Product;
  policyBranch: string;
  isRenewable: boolean;
  isAgeRate: boolean;
}

interface Product {
  idDyn: number;
  productName: string;
  isActive: number;
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

interface Flag {
  name: string;
  value: boolean | null;
  message: string | null;
}

interface QuotePreset {
  param1: string;
  param2: string;
  param3: string | null;
  paxNum: number;
  insuredAmount: number | null;
  basePrices: { idDyn: number };
  priceList: SaferPolicyPriceList;
  countryDestiny: Country;
  priceListParamsValues1: PriceListParamsValue;
  priceListParamsValues2: PriceListParamsValue;
  priceListParamsValues3: PriceListParamsValue;
  deletedPreviousInsuranceId: number | null;
}

interface PriceListParamsValue {
  deleteDate: boolean;
  idDyn: number;
  maxRange: number;
  minRange: number;
  name: string;
}

interface InsuranceInsured {
  id: number;
  isMainInsured: boolean;
  deleteDate: string | null;
  insured: Insured;
}

interface Insured {
  id: null | number;
  version: null | number;
  name: string;
  surname: string;
  treatment: string;
  documentType: string;
  documentNumber: string;
  birthDate: string;
  addressInfoList: AddressInfo[];
  contactInfoList: ContactInfo[];
}

interface InsuranceInsured {
  isMainInsured: boolean;
  insured: Insured;
}

interface Country {
  idDyn: number;
  name: string;
  isoCode2?: string;
  isoCode3?: string;
}

interface AddressInfo {
  commercialCity: string;
  commercialAddress: string;
  commercialPostalCode: string;
  commercialCountry: Country;
  commercialProvince: {
    idDyn: number;
    name: string;
  };
}

interface ContactInfo {
  phoneNumber: string;
  web: null | string;
  email: string;
}
