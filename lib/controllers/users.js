const { Router } = require('express');
const { exchangeCodeForToken, getAmazonProfile } = require('../utils/aws');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;
const IS_DEPLOYED = process.env.NODE_ENV === 'production';

module.exports = Router()
  .get('/signin', (req, res) => {
    res.redirect(
      `${process.env.AMAZON_COGNITO_DOMAIN}/authorize?client_id=${process.env.AMAZON_COGNITO_CLIENT_ID}&response_type=code&scope=${process.env.AMAZON_COGNITO_SCOPE}&redirect_uri=${process.env.AMAZON_COGNITO_REDIRECT_URI}`
    );
  })
  .get('/signin/callback?:code', async (req, res, next) => {
    const { code } = req.query;
    const token = await exchangeCodeForToken(code);
    const profile = await getAmazonProfile(token);
    let user = await User.findByUsername(profile.username);
    console.log(user);
    if (user === null) {
      user = await User.insert({
        username: profile.username,
        email: profile.email,
      });
    }

    try {
      res
        .cookie(
          process.env.COOKIE_NAME,
          jwt.sign({ ...user }, process.env.JWT_SECRET, {
            expiresIn: '1 day',
          }),
          {
            httpOnly: true,
            secure: IS_DEPLOYED,
            sameSite: IS_DEPLOYED ? 'none' : 'strict',
            maxAge: ONE_DAY_IN_MS,
          }
        )
        .redirect(
          process.env.NODE_ENV === 'test'
            ? '/api/v1/home'
            : `${process.env.LOCAL_REDIRECT}/home`
        );
    } catch (error) {
      next(error);
    }
  });
