const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const authBase64 = Buffer.from(
    `${process.env.AMAZON_COGNITO_CLIENT_ID}:${process.env.AMAZON_COGNITO_CLIENT_SECRET}`
  ).toString('base64');

  const headers = {
    Authorization: `Basic ${authBase64}`,
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const body = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.AMAZON_COGNITO_CLIENT_ID,
    client_secret: process.env.AMAZON_COGNITO_CLIENT_SECRET,
    code,
    redirect_uri: process.env.AMAZON_COGNITO_REDIRECT_URI,
  });

  const method = 'POST';

  const resp = await fetch(
    `${process.env.AMAZON_COGNITO_DOMAIN}/oauth2/token`,
    { method, headers, body }
  );

  const response = await resp.json();
  const access_token = response.access_token;

  return access_token;
};

const getAmazonProfile = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const res = await fetch(
    `${process.env.AMAZON_COGNITO_DOMAIN}/oauth2/userInfo`,
    { headers }
  );

  const profile = await res.json();

  console.log('profile: ', profile);

  return profile;
};

module.exports = { exchangeCodeForToken, getAmazonProfile };
