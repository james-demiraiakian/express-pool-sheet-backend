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
  tournamentId;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.position = row.position;
    this.indicator = row.indicator;
    this.touchScore = row.touch_score;
    this.touchReceive = row.touch_receive;
    this.victories = row.victories;
    this.userId = row.user_id;
    this.tournamentId = row.tournament_id;
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
    tournamentId,
  }) {
    const { rows } = await pool.query(
      `
      INSERT INTO 
        fencers (name, position, indicator, touch_score, touch_receive, victories, user_id, tournament_id)
      VALUES
        ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING
        *
      `,
      [
        name,
        position,
        indicator,
        touchScore,
        touchReceive,
        victories,
        userId,
        tournamentId,
      ]
    );

    return new Fencer(rows[0]);
  }

  static async fetchById(id) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        fencers
      WHERE
        id=$1
      `,
      [id]
    );

    return new Fencer(rows[0]);
  }

  static async fetchByTournamentId(tournamentId) {
    const { rows } = await pool.query(
      `
      SELECT
        *
      FROM
        fencers
      WHERE
        tournament_id=$1
      `,
      [tournamentId]
    );

    return rows.map((row) => new Fencer(row));
  }

  static async update(id, attributes) {
    const prevFencer = await Fencer.fetchById(id);
    const { name, position, indicator, touchScore, touchReceive, victories } = {
      ...prevFencer,
      ...attributes,
    };

    const { rows } = await pool.query(
      `
      UPDATE
        fencers
      SET
        name=$1,
        position=$2,
        indicator=$3,
        touch_score=$4,
        touch_receive=$5,
        victories=$6
      WHERE
        id=$7
      RETURNING
        *
      `,
      [name, position, indicator, touchScore, touchReceive, victories, id]
    );

    return new Fencer(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      `
      DELETE FROM
        fencers
      WHERE
        id=$1
      RETURNING
        *
      `,
      [id]
    );

    return new Fencer(rows[0]);
  }
};
