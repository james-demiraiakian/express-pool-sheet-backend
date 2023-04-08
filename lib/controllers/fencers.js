const { Router } = require('express');
const Fencer = require('../models/Fencer');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .get('/user/:userId', authenticate, async (req, res, next) => {
    try {
      const fencers = await Fencer.fetchAll(req.params.userId);
      res.send(fencers);
    } catch (error) {
      next(error);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const fencer = await Fencer.insert(req.body);
      res.send(fencer);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const fencer = await Fencer.fetchById(req.params.id);
      res.send(fencer);
    } catch (error) {
      next(error);
    }
  })
  .get('/tournament/:tournamentId', authenticate, async (req, res, next) => {
    try {
      const fencers = await Fencer.fetchByTournamentId(req.params.tournamentId);
      res.send(fencers);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', authenticate, async (req, res, next) => {
    try {
      const fencer = await Fencer.update(req.params.id, req.body);
      res.send(fencer);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', authenticate, async (req, res, next) => {
    try {
      const fencer = await Fencer.delete(req.params.id);
      res.send(fencer);
    } catch (error) {
      next(error);
    }
  });
