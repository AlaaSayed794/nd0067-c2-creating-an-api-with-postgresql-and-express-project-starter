/*https://www.postgresql.org/docs/9.1/datatype-enum.html*/
CREATE TYPE order_status AS ENUM ('active', 'complete');
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status order_status,
  user_id BIGINT REFERENCES users(id)
);