const pool = require('../utils/pool');

module.exports = class Fencer {
  id;
  name;
  position;
  indicator;
  touchScore;
  touchReceive;
  victories;
  userId;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.position = row.position;
    this.indicator = row.indicator;
    this.touchScore = row.touch_score;
    this.touchReceive = row.touch_receive;
    this.victories = row.victories;
    this.userId = row.user_id;
  }

  static async fetchAll(userId) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        fencers
      WHERE
        user_id=$1
      `,
      [userId]
    );

    return rows.map((row) => new Fencer(row));
  }

  static async insert({
    name,
    position,
    indicator,
    touchScore,
    touchReceive,
    victories,
    userId,
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
        fencers (name, position, indicator, touch_score, touch_receive, victories, user_id)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7)
      RETURNING
        *
      `,
      [name, position, indicator, touchScore, touchReceive, victories, userId]
    );

    return new Fencer(rows[0]);
  }
};
