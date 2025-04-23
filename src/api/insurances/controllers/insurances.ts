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
  commercialAddress?: string;
  commercialPostalCode?: string;
  commercialCountry?: Country;
  commercialProvince?: {
    idDyn: number;
    name: string;
  };
}

interface ContactInfo {
  phoneNumber?: string;
  web?: null | string;
  email?: string;
}

interface Insured {
  id?: null | number;
  version?: null | number;
  name?: string;
  surname?: string;
  treatment?: string;
  documentType?: string;
  documentNumber?: string;
  birthDate?: string;
  addressInfoList: AddressInfo[];
  contactInfoList: ContactInfo[];
}

export interface InsuranceInsured {
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

interface CreateInsuranceParams {
  unsuscribeDate?: string;
  effectDate?: string;
  policy?: Policy;
  quotePresetList?: QuotePreset[];
  insuranceInsuredList?: InsuranceInsured[];
}

interface GetInsuranceReportParams {
  id: number;
}

const AM_RECEPTIVO_AMURA_21_ID = 24919;

export default {
  async create(ctx) {
    const body = ctx.request.body as CreateInsuranceParams;

    try {
      const insurance = await strapi
        .service("api::insurances.insurances")
        .create(body);

      ctx.body = insurance;
    } catch (err) {
      console.error("Error creating insurance:", err);

      ctx.body = {
        error: "An error occurred while creating insurance",
        details: err instanceof Error ? err.message : "Unknown error",
      };
      ctx.status = 500;
    }
  },
  async getReport(ctx) {
    const params = ctx.request.query as GetInsuranceReportParams;

    try {
      const report = await strapi
        .service("api::insurances.insurances")
        .getReport(params.id);

      ctx.body = {
        report,
      };
    } catch (err) {
      console.error("Error fetching report:", err);

      ctx.body = {
        error: "An error occurred while fetching report data",
        details: err instanceof Error ? err.message : "Unknown error",
      };
      ctx.status = 500;
    }
  },
};
