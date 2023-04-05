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

  static async update(id, attributes) {
    const prevTournament = await this.fetchById(id);
    const { date, userId, fencerCount, fencerArr } = {
      ...prevTournament,
      ...attributes,
    };

    const { rows } = await pool.query(
      `
      UPDATE
        tournaments
      SET
        date=$1, 
        user_id=$2, 
        fencer_count=$3, 
        fencer_arr=$4
      WHERE
        id=$5
      RETURNING
        *
      `,
      [date, userId, fencerCount, fencerArr, id]
    );

    return new Tournament(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        tournaments
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Tournament(rows[0]);
  }
};
