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
  user_id TEXT,
  fencer_count INT,
  fencer_arr TEXT[]
);

CREATE TABLE fencers (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT,
  position INT,
  indicator INT,
  touch_score INT,
  touch_receive INT,
  victories INT,
  user_id text
);

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