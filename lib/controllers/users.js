const { Router } = require('express');
const { exchangeCodeForToken } = require('../utils/aws');

module.exports = Router()
  .get('/signin', (req, res) => {
    res.redirect(
      `${process.env.AMAZON_COGNITO_DOMAIN}/authorize?client_id=${process.env.AMAZON_COGNITO_CLIENT_ID}&response_type=code&scope=${process.env.AMAZON_COGNITO_SCOPE}&redirect_uri=${process.env.AMAZON_COGNITO_REDIRECT_URI}`
    );
  })
  .get('/signin/callback?:code', async (req, res, next) => {
    try {
      const { code } = req.query;
      const token = await exchangeCodeForToken(code);
      console.log('token', token);
    } catch (error) {
      next(error);
    }
  });
