interface AuthResponse {
  authData: {
    token: string;
  };
}

export async function getSaferAuthToken(): Promise<string | null> {
  const authBaseUrl = `${process.env.SAFER_DOMAIN}/users/v5/user/auth?origin=INT`;

  const token = process.env.SAFER_KEY;

  const tokenSubscription = process.env.SAFER_KEY_SUB;

  const username = process.env.SAFER_USER;

  const password = process.env.SAFER_PASS;

  const data = { username, password };

  try {
    const response = await fetch(authBaseUrl, {
      method: "POST",
      headers: {
        "x-api-key": token,
        "content-type": "application/json",
        "Ocp-Apim-Subscription-Key": tokenSubscription,
      },
      body: JSON.stringify(data),
    });

    const responseData = (await response.json()) as AuthResponse;

    return responseData.authData?.token || null;
  } catch (error) {
    console.error("Error fetching authentication token:", error);
    throw new Error("Failed to fetch authentication token");
  }
}
