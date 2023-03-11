const { Router } = require('express');
// const authenticate = require('../middleware/authenticate');
const Tournament = require('../models/Tournament');

module.exports = Router()
  // add authenticate after confirmed working
  .post('/', async (req, res, next) => {
    try {
      const tournament = await Tournament.insert(req.body);
      res.send(tournament);
    } catch (error) {
      next(error);
    }
  });
