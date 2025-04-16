import { getSaferAuthToken } from "../../utils/safer";
import { Policy } from "../models/Policy";
import { SaferGetPolicyResponse } from "../models/SaferGetPolicyResponse";
import { SaferPostPolicyResponse } from "../models/SaferPostPolicyResponse";

interface GetPolicyParams {
  id: number;
  numberOfPax: number;
  numberOfDays: number;
}

const token = process.env.SAFER_KEY;

const tokenSubscription = process.env.SAFER_KEY_SUB;

module.exports = {
  getPolicy: async ({ id, numberOfDays, numberOfPax }: GetPolicyParams) => {
    try {
      const tokensafer = await getSaferAuthToken();

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
      )?.priceListParamsValues[0].idDyn;

      const durationPriceListId = product.priceList.priceListParamsList
        .find((priceList) => priceList.paramType === "duracion")
        ?.priceListParamsValues.find(
          (priceList) =>
            numberOfDays >= priceList.minRange &&
            numberOfDays <= priceList.maxRange
        )?.idDyn;

      const postPolicyData = {
        coverageExtensions: [],
        quotePresetList: [
          {
            paxNum: Number(numberOfPax),
            priceListParamsValues1: {
              idDyn: destinyPriceListId,
            },
            priceListParamsValues2: {
              idDyn: durationPriceListId,
            },
            insuredAmount: null,
          },
        ],
      };

      console.info("Post Policy Data:", JSON.stringify(postPolicyData));

      const postPolicyBaseURL = `${process.env.SAFER_DOMAIN}/policies/v5/policy/${id}/pricing?origin=SF`;

      const postPolicyResponse = await fetch(postPolicyBaseURL, {
        method: "POST",
        headers: {
          "x-api-key": `${token}`,
          "content-type": "application/json",
          "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
          Authorization: `Bearer ${tokensafer}`,
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
