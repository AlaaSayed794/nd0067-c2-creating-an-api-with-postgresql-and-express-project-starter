import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
};

export type OrderProduct = {
  id?: number;
  quantity: number;
  product_id: number;
  order_id: number;
};

export class OrderStore {
  async index(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find order ${id}. Error: ${err}`);
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.status, o.user_id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add new order to user ${o.user_id} . Error: ${err}`
      );
    }
  }

  async delete(id: string): Promise<Order> {
    try {
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
      const sql2 = 'DELETE FROM order_products WHERE order_id=($1) RETURNING *';
      const conn = await Client.connect();
      await conn.query(sql2, [id]);

      const result = await conn.query(sql, [id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: number,
    productId: number
  ): Promise<OrderProduct> {
    try {
      const ordersql = 'SELECT * FROM orders WHERE id=($1)';
      const conn = await Client.connect();
      const result = await conn.query(ordersql, [orderId]);
      const order = result.rows[0];

      if (order.status !== 'active') {
        throw new Error(
          `Could not add product ${productId} to order ${orderId} because order status is ${order.status}`
        );
      }

      conn.release();
    } catch (err) {
      throw new Error(`${err}`);
    }

    try {
      const sql =
        'INSERT INTO order_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';
      const conn = await Client.connect();

      const result = await conn.query(sql, [quantity, orderId, productId]);

      const order: OrderProduct = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(
        `Could not add product ${productId} to order ${orderId}: ${err}`
      );
    }
  }


  async getUserOrders(user_id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE user_id=' + user_id;

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get orders. Error: ${err}`);
    }
  }
  async setOrderStatus(id: number, status: string): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'UPDATE orders SET status=$1 WHERE id=$2 RETURNING *';
      const result = await conn.query(sql, [status, id]);

      const order = result.rows[0];

      conn.release();

      return order;
    } catch (err) {
      throw new Error(`Could not update order ${id}. ${err}`);
    }
  }
}
