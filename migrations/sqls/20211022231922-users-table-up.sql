CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(50) Not NULL,
  last_name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL
);