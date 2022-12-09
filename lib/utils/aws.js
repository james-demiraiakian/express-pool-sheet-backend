const fetch = require('cross-fetch');

const exchangeCodeForToken = async (code) => {
  const authBase64 = Buffer.from(
    `${process.env.AMAZON_COGNITO_CLIENT_ID}:${process.env.AMAZON_COGNITO_CLIENT_SECRET}`
  ).toString('base64');

  const config = {
    headers: {
      Authorization: `Basic ${authBase64}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };

  const body = JSON.stringify({
    grant_type: 'authorization_code',
    client_id: process.env.AMAZON_COGNITO_CLIENT_ID,
    client_secret: process.env.AMAZON_COGNITO_CLIENT_SECRET,
    code,
    redirect_uri: process.env.AMAZON_COGNITO_REDIRECT_URI,
  });

  const resp = await fetch(
    `${process.env.AMAZON_COGNITO_DOMAIN}/oauth2/token`,
    body,
    config
  );

  const response = await resp.json();
  console.log('Response in aws.js', response.data);
  // const { access_token } = await resp.json();
  // console.log(access_token);
  // return access_token;
};

module.exports = { exchangeCodeForToken };
