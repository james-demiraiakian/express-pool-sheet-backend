-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users, tournaments, fencers, bouts;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE tournaments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date DATE,
  user_id TEXT
);

INSERT INTO
  tournaments (date, user_id)
VALUES
  ('2023-04-05', 1),
  ('2023-01-23', 1);

CREATE TABLE fencers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT,
  position INT,
  indicator INT,
  touch_score INT,
  touch_receive INT,
  victories INT,
  user_id INT,
  tournament_id INT
);

INSERT INTO
  fencers (name, position, indicator, touch_score, touch_receive, victories, user_id, tournament_id)
VALUES
  ('Duckey', 1, 0, 0, 0, 0, 1, 1),
  ('Mina', 1, 0, 0, 0, 0, 1, 1),
  ('Froderick', 1, 0, 0, 0, 0, 1, 1),
  ('Oloph', 1, 0, 0, 0, 0, 1, 1),
  ('Smokey', 1, 0, 0, 0, 0, 1, 2),
  ('Duckey', 1, 0, 0, 0, 0, 1, 2),
  ('Mina', 1, 0, 0, 0, 0, 1, 2),
  ('Froderick', 1, 0, 0, 0, 0, 1, 2),
  ('Oloph', 1, 0, 0, 0, 0, 1, 2),
  ('Eyowin', 1, 0, 0, 0, 0, 1, 2);

CREATE TABLE bouts (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  fencer_one_id INT,
  fencer_two_id INT,
  ts_one INT,
  ts_two INT,
  tr_one INT,
  tr_two INT,
  v_one boolean,
  v_two boolean,
  tournament_id INT
);

INSERT INTO
  bouts (fencer_one_id, fencer_two_id, ts_one, ts_two, tr_one, tr_two, v_one, v_two, tournament_id)
VALUES
  (1, 2, 0, 0, 0, 0, false, false, 1),
  (1, 3, 0, 0, 0, 0, false, false, 1),
  (1, 4, 0, 0, 0, 0, false, false, 1),
  (2, 3, 0, 0, 0, 0, false, false, 1),
  (2, 3, 0, 0, 0, 0, false, false, 1),
  (3, 4, 0, 0, 0, 0, false, false, 1),
  (1, 2, 0, 0, 0, 0, false, false, 2),
  (1, 3, 0, 0, 0, 0, false, false, 2),
  (1, 4, 0, 0, 0, 0, false, false, 2),
  (1, 5, 0, 0, 0, 0, false, false, 2),
  (1, 6, 0, 0, 0, 0, false, false, 2),
  (2, 3, 0, 0, 0, 0, false, false, 2),
  (2, 4, 0, 0, 0, 0, false, false, 2),
  (2, 5, 0, 0, 0, 0, false, false, 2),
  (2, 6, 0, 0, 0, 0, false, false, 2),
  (3, 4, 0, 0, 0, 0, false, false, 2),
  (3, 5, 0, 0, 0, 0, false, false, 2),
  (3, 6, 0, 0, 0, 0, false, false, 2),
  (4, 5, 0, 0, 0, 0, false, false, 2),
  (4, 6, 0, 0, 0, 0, false, false, 2),
  (5, 6, 0, 0, 0, 0, false, false, 2);
  
  