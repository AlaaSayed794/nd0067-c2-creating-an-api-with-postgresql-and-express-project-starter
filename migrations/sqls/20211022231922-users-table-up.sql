CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(64) Not NULL UNIQUE,
  first_name VARCHAR(64) Not NULL,
  last_name VARCHAR(64) NOT NULL,
  password VARCHAR(255) NOT NULL
);