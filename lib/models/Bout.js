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
    this.tournamentId = row.tournament_id;
  }

  static async insert(attributes) {
    const {
      fencerOneId,
      fencerTwoId,
      tsOne,
      tsTwo,
      trOne,
      trTwo,
      vOne,
      vTwo,
      tournamentId,
    } = attributes;

    const { rows } = await pool.query(
      `
      INSERT INTO
        bouts (fencer_one_id, fencer_two_id, ts_one, ts_two, tr_one, tr_two, v_one, v_two, tournament_id)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING
        *
      `,
      [
        fencerOneId,
        fencerTwoId,
        tsOne,
        tsTwo,
        trOne,
        trTwo,
        vOne,
        vTwo,
        tournamentId,
      ]
    );

    return new Bout(rows[0]);
  }

  static async fetchAll(tournamentId) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        bouts
      WHERE
        tournament_id=$1
      `,
      [tournamentId]
    );

    return rows.map((row) => new Bout(row));
  }

  static async fetchById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        bouts
      WHERE
        id=$1
      `,
      [id]
    );

    return new Bout(rows[0]);
  }

  static async update(id, attributes) {
    const prevBout = await this.fetchById(id);
    const {
      fencerOneId,
      fencerTwoId,
      tsOne,
      tsTwo,
      trOne,
      trTwo,
      vOne,
      vTwo,
      tournamentId,
    } = { ...prevBout, ...attributes };

    const { rows } = await pool.query(
      `
      UPDATE
        bouts
      SET
        fencer_one_id=$1,
        fencer_two_id=$2,
        ts_one=$3,
        ts_two=$4,
        tr_one=$5,
        tr_two=$6,
        v_one=$7,
        v_two=$8,
        tournament_id=$9
      WHERE
        id=$10
      RETURNING
        *
      `,
      [
        fencerOneId,
        fencerTwoId,
        tsOne,
        tsTwo,
        trOne,
        trTwo,
        vOne,
        vTwo,
        tournamentId,
        id,
      ]
    );

    return new Bout(rows[0]);
  }
};
