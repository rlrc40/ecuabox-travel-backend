import { getSaferAuthToken } from "../../utils/safer";
import { mapSaferToCountry } from "../models/country-mapper";
import { SaferCountriesResponse } from "../models/SaferCountryResponse";

const token = process.env.SAFER_KEY;

const tokenSubscription = process.env.SAFER_KEY_SUB;

module.exports = {
  getCountries: async () => {
    try {
      const tokensafer = await getSaferAuthToken();

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
