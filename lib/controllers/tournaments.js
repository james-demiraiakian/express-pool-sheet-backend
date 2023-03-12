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
  })
  .get('/user/:userId', async (req, res, next) => {
    try {
      const tournaments = await Tournament.fetchAll(req.params.userId);
      res.send(tournaments);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const tournament = await Tournament.fetchById(req.params.id);
      res.send(tournament);
    } catch (error) {
      next(error);
    }
  });
