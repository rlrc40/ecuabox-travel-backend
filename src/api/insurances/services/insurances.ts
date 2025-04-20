import { getSaferAuthToken } from "../../utils/safer";

interface Policy {
  idDyn: number;
  policyNumber: string;
  product: {
    idDyn: number;
    productName: string;
  };
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

interface QuotePreset {
  paxNum: number;
  basePrices: { idDyn: number };
  priceListParamsValues1: { idDyn: number };
  priceListParamsValues2: { idDyn: number };
  insuredAmount: number;
  countryDestiny: Country;
  countryOrigin: Country;
}

interface SalePoint {
  idDyn: number;
}

interface CreateInsuranceParams {
  bookingReference1: null | string;
  bookingReference2: string;
  unsuscribeDate: string;
  effectDate: string;
  policy: Policy;
  quotePresetList: QuotePreset[];
  salePoint: SalePoint;
  insuranceInsuredList: InsuranceInsured[];
}

const token = process.env.SAFER_KEY;

const tokenSubscription = process.env.SAFER_KEY_SUB;

module.exports = {
  create: async (createInsuranceParams: CreateInsuranceParams) => {
    try {
      const tokensafer = await getSaferAuthToken();

      const createApiBaseURL = `${process.env.SAFER_DOMAIN}/insurances/v5/insurance?origin=SF`;

      console.log("Create Insureance API Base URL:", createApiBaseURL);

      const createResponse = await fetch(createApiBaseURL, {
        method: "POST",
        headers: {
          "x-api-key": `${token}`,
          "content-type": "application/json",
          "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
          Authorization: `Bearer ${tokensafer}`,
        },
        body: JSON.stringify(createInsuranceParams),
      });

      const saferCreateInsuranceResponse = await createResponse.json();

      console.log(
        "Safer Create Insurance Response:",
        saferCreateInsuranceResponse
      );
    } catch (error) {
      console.error("Error fetching policy from Safer:", error);

      throw new Error(`Error fetching Policy from Safer: ${error.message}`);
    }
  },
  getReport: async (id: number) => {
    const tokensafer = await getSaferAuthToken();

    const createReportApiBaseURL = `${process.env.SAFER_DOMAIN}/reports/v5/insurance/${id}?origin=SF&groupal=false&pvp=false&exc_generalConditions=true&exc_ipid=false`;

    const createReportResponse = await fetch(createReportApiBaseURL, {
      method: "GET",
      headers: {
        "x-api-key": `${token}`,
        "content-type": "application/json",
        "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
        Authorization: `Bearer ${tokensafer}`,
      },
    });

    const saferGetPolicyReportResponse = await createReportResponse.json();

    console.log(
      "Create Insurance Report API Base URL:",
      createReportApiBaseURL
    );

    console.log(
      "Safer Create Insurance Report Response:",
      saferGetPolicyReportResponse
    );
    return saferGetPolicyReportResponse;
  },
};
