CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status order_status,
  user_id BIGINT REFERENCES users(id)
);