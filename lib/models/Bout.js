const pool = require('../utils/pool');

module.exports = class Bout {
  id;
  fencerOneId;
  fencerTwoId;
  tsOne;
  tsTwo;
  trOne;
  trTwo;
  vOne;
  vTwo;
  tournamentId;

  constructor(row) {
    this.id = row.id;
    this.fencerOneId = row.fencer_one_id;
    this.fencerTwoId = row.fencer_two_id;
    this.tsOne = row.ts_one;
    this.tsTwo = row.ts_two;
    this.trOne = row.tr_one;
    this.trTwo = row.tr_two;
    this.vOne = row.v_one;
    this.vTwo = row.v_two;
  }
};
