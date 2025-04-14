import { Policy } from "../models/Policy";
import { SaferGetPolicyResponse } from "../models/SaferGetPolicyResponse";
import { SaferPostPolicyResponse } from "../models/SaferPostPolicyResponse";

interface GetPolicyParams {
  id: number;
  numberOfPax: number;
  numberOfDays: number;
}

module.exports = {
  getPolicy: async ({ id, numberOfDays, numberOfPax }: GetPolicyParams) => {
    try {
      const loginBaseURL = `${process.env.SAFER_DOMAIN}/users/v5/user/auth?origin=INT`;
      const token = process.env.SAFER_KEY;
      const tokenSubscription = process.env.SAFER_KEY_SUB;
      const username = process.env.SAFER_USER;
      const password = process.env.SAFER_PASS;

      const data = { username: `${username}`, password: `${password}` };

      const saferResponse = await fetch(loginBaseURL, {
        method: "POST",
        headers: {
          "x-api-key": `${token}`,
          "content-type": "application/json",
          "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
        },
        body: JSON.stringify(data),
      });

      const responseData: any = await saferResponse.json();

      const tokensafer = responseData.authData.token
        ? responseData.authData.token
        : null;

      const getPolicyApiBaseURL = `${process.env.SAFER_DOMAIN}/policies/v5/policy/${id}?origin=SF`;

      console.log("Get Policy API Base URL:", getPolicyApiBaseURL);

      const getPolicyResponse = await fetch(getPolicyApiBaseURL, {
        method: "GET",
        headers: {
          "x-api-key": `${token}`,
          "content-type": "application/json",
          "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
          Authorization: `Bearer ${tokensafer}`,
        },
      });

      const saferGetPolicyResponse =
        (await getPolicyResponse.json()) as SaferGetPolicyResponse;

      console.log("Safer Get Policy Response:", saferGetPolicyResponse);

      const { product } = saferGetPolicyResponse;

      const destinyPriceListId = product.priceList.priceListParamsList.find(
        (priceList) => priceList.paramType === "ambito_cobertura"
      )?.priceListParamsValuesList[0].idDyn;

      const durationPriceListId = product.priceList.priceListParamsList
        .find((priceList) => priceList.paramType === "duracion")
        ?.priceListParamsValuesList.find(
          (priceList) => priceList.maxRange <= numberOfDays
        )?.idDyn;

      const postPolicyData = {
        params: {
          coverageExtensions: [],
          quotePresetList: [
            {
              paxNum: numberOfPax,
              priceListParamsValues1: {
                idDyn: destinyPriceListId,
              },
              priceListParamsValues2: {
                idDyn: durationPriceListId,
              },
              insuredAmount: null,
            },
          ],
        },
        _id: saferGetPolicyResponse.idDyn,
      };

      console.log("Post Policy Data:", postPolicyData);

      const postPolicyBaseURL = `${process.env.SAFER_DOMAIN}/users/v5/user/auth?origin=INT`;

      const postPolicyResponse = await fetch(postPolicyBaseURL, {
        method: "POST",
        headers: {
          "x-api-key": `${token}`,
          "content-type": "application/json",
          "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
        },
        body: JSON.stringify(postPolicyData),
      });

      const postPolicyResponseData =
        (await postPolicyResponse.json()) as SaferPostPolicyResponse;

      console.log("Safer Post Policy Response:", postPolicyResponseData);

      const policy = new Policy(postPolicyResponseData);

      console.log("Policy:", policy);

      return policy;
    } catch (error) {
      console.error("Error fetching policy from Safer:", error);

      throw new Error(`Error fetching Policy from Safer: ${error.message}`);
    }
  },
};
