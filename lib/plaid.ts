import { Configuration, PlaidApi } from "plaid";

const configuration = new Configuration({
  basePath: "https://sandbox.plaid.com", // Use the sandbox URL as a string
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
      "PLAID-SECRET": process.env.PLAID_SECRET,
    },
  },
});

export const plaidClient = new PlaidApi(configuration);
