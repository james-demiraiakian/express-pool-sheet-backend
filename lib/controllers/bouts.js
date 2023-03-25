const { Router } = require('express');
const Bout = require('../models/Bout');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const bouts = await Bout.insert(req.body);
    res.send(bouts);
  } catch (error) {
    next(error);
  }
});
