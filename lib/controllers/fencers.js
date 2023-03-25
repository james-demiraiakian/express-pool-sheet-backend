const { Router } = require('express');
const Fencer = require('../models/Fencer');

module.exports = Router()
  .get('/user/:userId', async (req, res, next) => {
    try {
      const fencers = await Fencer.fetchAll(req.params.userId);
      res.send(fencers);
    } catch (error) {
      next(error);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const fencer = await Fencer.insert(req.body);
      res.send(fencer);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const fencer = await Fencer.fetchById(req.params.id);
      res.send(fencer);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const fencer = await Fencer.update(req.params.id, req.body);
      res.send(fencer);
    } catch (error) {
      next(error);
    }
  });
