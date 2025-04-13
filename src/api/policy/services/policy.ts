import { mapSaferPolicy } from "../models/policy-mapper";
import { SaferPolicyResponse } from "../models/SaferPolicyResponse";

module.exports = {
  getPolicy: async (id: number) => {
    try {
      const baseURL = `${process.env.SAFER_DOMAIN}/users/v5/user/auth?origin=INT`;
      const token = process.env.SAFER_KEY;
      const tokenSubscription = process.env.SAFER_KEY_SUB;
      const username = process.env.SAFER_USER;
      const password = process.env.SAFER_PASS;

      const data = { username: `${username}`, password: `${password}` };
      const options = {
        method: "POST",
        headers: {
          "x-api-key": `${token}`,
          "content-type": "application/json",
          "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
        },
        data: {
          username: `${username}`,
          password: `${password}`,
        },
        baseURL,
      };
      const saferResponse = await fetch(baseURL, {
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

      const policyApiBaseURL = `${process.env.SAFER_DOMAIN}/policies/v5/policy/${id}?origin=SF`;

      const policyResponse = await fetch(policyApiBaseURL, {
        method: "GET",
        headers: {
          "x-api-key": `${token}`,
          "content-type": "application/json",
          "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
          Authorization: `Bearer ${tokensafer}`,
        },
      });

      const saferPolicyResponse =
        (await policyResponse.json()) as SaferPolicyResponse;

      const policy = mapSaferPolicy(saferPolicyResponse);

      return policy;
    } catch (error) {
      console.error("Error fetching policy from Safer:", error);

      throw new Error(`Error fetching Policy from Safer: ${error.message}`);
    }
  },
};
