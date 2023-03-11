const pool = require('../utils/pool');

module.exports = class Tournament {
  id;
  date;
  userId;
  fencerCount;
  fencerArr;

  constructor(row) {
    this.id = row.id;
    this.date = row.date;
    this.userId = row.userId;
    this.fencerCount = row.fencerCount;
    this.fencerArr = row.fencerArr;
  }
};
