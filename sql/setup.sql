-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS users, tournaments;

CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE tournaments (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  date DATE,
  user_id TEXT,
  fencerCount INT,
  fencerArr TEXT[]
)
