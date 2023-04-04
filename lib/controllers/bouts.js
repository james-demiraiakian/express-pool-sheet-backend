const { Router } = require('express');
const Bout = require('../models/Bout');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const bout = await Bout.insert(req.body);
      res.send(bout);
    } catch (error) {
      next(error);
    }
  })
  .get('/tournament/:id', async (req, res, next) => {
    try {
      const bouts = await Bout.fetchAll(req.params.id);
      res.send(bouts);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const bout = await Bout.fetchById(req.params.id);
      res.send(bout);
    } catch (error) {
      next(error);
    }
  })
  .patch('/:id', async (req, res, next) => {
    try {
      const bout = await Bout.update(req.params.id, req.body);
      res.send(bout);
    } catch (error) {
      next(error);
    }
  });
