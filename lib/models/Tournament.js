const pool = require('../utils/pool');

module.exports = class Tournament {
  id;
  date;
  userId;

  constructor(row) {
    this.id = row.id;
    this.date = row.date;
    this.userId = row.user_id;
  }

  static async insert({ date, userId }) {
    const { rows } = await pool.query(
      `
      INSERT INTO
        tournaments (date, user_id)
      VALUES
        ($1, $2)
      RETURNING
        *
      `,
      [date, userId]
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
    const { date, userId } = {
      ...prevTournament,
      ...attributes,
    };

    const { rows } = await pool.query(
      `
      UPDATE
        tournaments
      SET
        date=$1, 
        user_id=$2
      WHERE
        id=$3
      RETURNING
        *
      `,
      [date, userId, id]
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
