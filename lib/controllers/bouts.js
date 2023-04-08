const { Router } = require('express');
const Bout = require('../models/Bout');
const Fencer = require('../models/Fencer');
const authenticate = require('../middleware/authenticate');

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const bout = await Bout.insert(req.body);
      res.send(bout);
    } catch (error) {
      next(error);
    }
  })
  .get('/tournament/:id', authenticate, async (req, res, next) => {
    try {
      const bouts = await Bout.fetchAll(req.params.id);
      const namedBouts = [];

      await Promise.all(
        bouts.map(async (bout) => {
          const fencerOne = await Fencer.fetchById(bout.fencerOneId);
          const fencerTwo = await Fencer.fetchById(bout.fencerTwoId);
          const newBout = {
            ...bout,
            fencerOneName: fencerOne.name,
            fencerTwoName: fencerTwo.name,
          };
          namedBouts.push(newBout);
        })
      );

      res.send(namedBouts);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', authenticate, async (req, res, next) => {
    try {
      const bout = await Bout.fetchById(req.params.id);
      res.send(bout);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', authenticate, async (req, res, next) => {
    try {
      const bout = await Bout.update(req.params.id, req.body);
      res.send(bout);
    } catch (error) {
      next(error);
    }
  });
