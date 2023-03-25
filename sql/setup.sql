-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users, tournaments, fencers;

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
