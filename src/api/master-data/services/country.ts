import FetchResponse from "../../models/FetchResponse";
import { mapSaferToCountry } from "../models/country-mapper";
import { SaferCountriesResponse } from "../models/SaferCountryResponse";

module.exports = {
  getCountries: async () => {
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

      const countryApiBaseURL = `${process.env.SAFER_DOMAIN}/policies/v5/country?origin=SF`;

      const countryResponse = await fetch(countryApiBaseURL, {
        method: "GET",
        headers: {
          "x-api-key": `${token}`,
          "content-type": "application/json",
          "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
          Authorization: `Bearer ${tokensafer}`,
        },
      });

      const saferCountriesResponse =
        (await countryResponse.json()) as SaferCountriesResponse;

      const countries = saferCountriesResponse.map(mapSaferToCountry);

      return countries;
    } catch (error) {
      console.error("Error fetching countries from Safer:", error);

      throw new Error(`Error fetching Countries from Safer: ${error.message}`);
    }
  },
};
