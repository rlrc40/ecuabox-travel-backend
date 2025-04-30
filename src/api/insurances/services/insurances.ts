import { getSaferAuthToken } from "../../utils/safer";
import { SaferCreateInsuranceResponse } from "../models/SaferCreateInsuranceResponse";
import { SaferGetInsurancePolicyReportResponse } from "../models/SaferGetInsurancePolicyReportResponse";

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
  insuranceInsuredList: InsuranceInsured[];
}

interface EmailConfirmationTemplateParams {
  customerName: string;
  policyNumber: string;
  issueDate: string;
  destination: string;
  startDate: string;
  endDate: string;
  supportPhone: string;
  supportEmail: string;
  appName: string;
  logoUrl: string;
  year: number;
}

const getEmailConfirmationTemplate = (
  params: EmailConfirmationTemplateParams
) => {
  const {
    customerName,
    policyNumber,
    issueDate,
    destination,
    startDate,
    endDate,
    supportPhone,
    supportEmail,
    appName,
    logoUrl,
    year,
  } = params;
  return `<!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Travel Insurance Confirmation</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          background-color: #ffffff;
          margin: 30px auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          padding-bottom: 20px;
        }
        .header img {
          max-height: 50px;
        }
        .content h2 {
          color: #2c3e50;
        }
        .content p {
          color: #555;
          line-height: 1.6;
        }
        .details {
          background-color: #f0f8ff;
          padding: 15px;
          margin: 20px 0;
          border-radius: 5px;
        }
        .details p {
          margin: 5px 0;
        }
        .cta {
          text-align: center;
          margin-top: 30px;
        }
        .cta a {
          background-color: #007bff;
          color: #fff;
          padding: 12px 24px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        .footer {
          margin-top: 40px;
          font-size: 12px;
          color: #888;
          text-align: center;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img src="${logoUrl}" alt="App Logo" />
        </div>
        <div class="content">
          <h2>Your Travel Insurance Is Confirmed!</h2>
          <p>Hello <strong>${customerName}</strong>,</p>
          <p>
            Thank you for choosing <strong>${appName}</strong>. Your travel
            insurance policy has been successfully issued. Below are your policy
            details:
          </p>

          <div class="details">
            <p><strong>Policy Number:</strong> ${policyNumber}</p>
            <p><strong>Issue Date:</strong> ${issueDate}</p>
            <p><strong>Destination:</strong> ${destination}</p>
            <p><strong>Travel Dates:</strong> ${startDate} - ${endDate}</p>
          </div>

          <p>
            The PDF policy and your assistance card are attached to this email.
          </p>

          <p>
            <strong>Need help while traveling?</strong><br />
            Our support is available 24/7:
          </p>
          <ul>
            <li>📞 <strong>Phone:</strong> ${supportPhone}</li>
            <li>✉️ <strong>Email:</strong> ${supportEmail}</li>
          </ul>

          <p>We wish you a safe and pleasant journey!</p>
          <p>– The ${appName} Team</p>
        </div>

        <div class="footer">
          © ${year} ${appName}. All rights reserved.
        </div>
      </div>
    </body>
  </html>
`;
};

const token = process.env.SAFER_KEY;

const tokenSubscription = process.env.SAFER_KEY_SUB;

module.exports = {
  create: async (createInsuranceParams: CreateInsuranceParams) => {
    try {
      const tokensafer = await getSaferAuthToken();

      const createApiBaseURL = `${process.env.SAFER_DOMAIN}/insurances/v5/insurance?origin=SF`;

      console.log("Create Insureance API Base URL:", createApiBaseURL);

      console.log(
        "Insurance request",
        JSON.stringify({
          ...createInsuranceParams,
          salePoint: {
            idDyn: 18476,
          },
        })
      );

      const createResponse = await fetch(createApiBaseURL, {
        method: "POST",
        headers: {
          "x-api-key": `${token}`,
          "content-type": "application/json",
          "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
          Authorization: `Bearer ${tokensafer}`,
        },
        body: JSON.stringify({
          ...createInsuranceParams,
          salePoint: {
            idDyn: 18476,
          },
        }),
      });

      const saferCreateInsuranceResponse =
        (await createResponse.json()) as SaferCreateInsuranceResponse;

      console.log(
        "Safer Create Insurance Response:",
        saferCreateInsuranceResponse
      );

      const getReportApiBaseURL = `${process.env.SAFER_DOMAIN}/reports/v5/insurance/${saferCreateInsuranceResponse.id}?origin=SF&groupal=false&pvp=false&exc_generalConditions=true&exc_ipid=false`;

      const createReportResponse = await fetch(getReportApiBaseURL, {
        method: "GET",
        headers: {
          "x-api-key": `${token}`,
          "content-type": "application/json",
          "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
          Authorization: `Bearer ${tokensafer}`,
        },
      });

      const saferGetPolicyReportResponse =
        (await createReportResponse.json()) as SaferGetInsurancePolicyReportResponse;

      await fetch(
        `${process.env.SAFER_DOMAIN}/insurances/v5/insurance/${saferCreateInsuranceResponse.id}?origin=SF`,
        {
          method: "DELETE",
          headers: {
            "x-api-key": `${token}`,
            "content-type": "application/json",
            "Ocp-Apim-Subscription-Key": `${tokenSubscription}`,
            Authorization: `Bearer ${tokensafer}`,
          },
        }
      );

      const mainInsured =
        saferCreateInsuranceResponse.insuranceInsuredList.find(
          (insured) => insured.isMainInsured
        )?.insured;

      const strapiEmailOptions = {
        to: mainInsured.contactInfoList[0].email,
        subject: "¡Tu seguro de viaje está confirmado! Aquí tienes tu póliza",
        attachments: [
          {
            filename: saferGetPolicyReportResponse.fileName,
            content: saferGetPolicyReportResponse.base64File,
            contentType: "application/pdf",
          },
        ],
        html: getEmailConfirmationTemplate({
          customerName: mainInsured.name,
          policyNumber: saferCreateInsuranceResponse.policy.policyNumber,
          issueDate: new Date().toLocaleDateString("es-ES"),
          destination:
            saferCreateInsuranceResponse.quotePresetList[0].countryDestiny.name,
          startDate: saferCreateInsuranceResponse.effectDate,
          endDate: saferCreateInsuranceResponse.unsuscribeDate,
          supportPhone: "+34 000 000 000",
          supportEmail: "contacto@waycare.es",
          appName: "WayCare",
          logoUrl: "",
          year: new Date().getFullYear(),
        }),
      };

      console.log("Email Options:", strapiEmailOptions);

      await strapi.plugins["email"].services.email.send(strapiEmailOptions);

      return saferGetPolicyReportResponse;
    } catch (error) {
      console.error("Error creating insurance policy from Safer:", error);

      throw new Error(
        `Error creating insurance Policy from Safer: ${error.message}`
      );
    }
  },
};
