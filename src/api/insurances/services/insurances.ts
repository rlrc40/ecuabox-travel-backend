import { getSaferAuthToken } from "../../utils/safer";

interface CreateInsuranceParams {
  id: number;
  numberOfPax: number;
  numberOfDays: number;
}

const token = process.env.SAFER_KEY;

const tokenSubscription = process.env.SAFER_KEY_SUB;

module.exports = {
  create: async ({ id, numberOfDays, numberOfPax }: CreateInsuranceParams) => {
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
        body: JSON.stringify({}),
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
