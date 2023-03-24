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
    this.userId = row.user_id;
    this.fencerCount = row.fencer_count;
    this.fencerArr = row.fencer_arr;
  }

  static async insert({ date, userId, fencerCount, fencerArr }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        tournaments (date, user_id, fencer_count, fencer_arr)
      VALUES
        ($1, $2, $3, $4)
      RETURNING
        *
      `,
      [date, userId, fencerCount, fencerArr]
    );

    return new Tournament(rows[0]);
  }

  static async fetchAll(userId) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        tournaments
      WHERE
        user_id=$1
      `,
      [userId]
    );

    return rows.map((row) => new Tournament(row));
  }

  static async fetchById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        tournaments
      WHERE
        id=$1
      `,
      [id]
    );

    return new Tournament(rows[0]);
  }
};
