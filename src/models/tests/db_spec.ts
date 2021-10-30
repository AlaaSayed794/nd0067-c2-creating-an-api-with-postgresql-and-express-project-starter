import { User, UserStore } from '../user';
import { Order, OrderProduct, OrderStore } from '../order';
import { Product, ProductStore } from '../product';

import client from '../../database';
const oStore = new OrderStore();
const pStore = new ProductStore();
const uStore = new UserStore();

describe('User Model', () => {
  const newUser: User = {
    user_name: 'newUser123',
    first_name: 'testUser',
    last_name: 'last_name',
    password: 'testPassword'
  };
  const createdUser: User = { ...newUser, id: 1 };

  const newProduct: Product = {
    name: 'new product',
    price: 100
  };
  const createdProduct: Product = { ...newProduct, id: 1 };

  const newOrder: Order = {
    status: 'active',
    user_id: 1
  };
  const createdOrder: Order = { ...newOrder, id: 1 };

  const newOrderProduct: OrderProduct = {
    quantity: 20,
    order_id: createdOrder.id as number,
    product_id: createdProduct.id as number
  };

  describe('User Model', () => {
    it('should have a create method', () => {
      expect(uStore.create).toBeDefined();
    });

    it('should have an authenticate method', () => {
      expect(uStore.authenticate).toBeDefined();
    });

    it('create method should add a user', async () => {
      const result = await uStore.create(newUser);
      expect(result.user_name).toEqual(createdUser.user_name);
      expect(result.first_name).toEqual(createdUser.first_name);
      expect(result.last_name).toEqual(createdUser.last_name);
      expect(result.id).toEqual(createdUser.id);
    });

    it('authenticate method should return the correct user', async () => {
      const result = (await uStore.authenticate(
        newUser.user_name,
        newUser.password
      )) as User;
      expect(result.user_name).toEqual(createdUser.user_name);
      expect(result.first_name).toEqual(createdUser.first_name);
      expect(result.last_name).toEqual(createdUser.last_name);
      expect(result.id).toEqual(createdUser.id);
    });
  });

  describe('Product Model', () => {
    it('should have an index method', () => {
      expect(pStore.index).toBeDefined();
    });

    it('should have a show method', () => {
      expect(pStore.show).toBeDefined();
    });

    it('should have a create method', () => {
      expect(pStore.create).toBeDefined();
    });

    it('create method should add a product', async () => {
      const result = await pStore.create(newProduct);
      expect(result.name).toEqual(createdProduct.name);
      expect(result.price).toEqual(createdProduct.price);
      expect(result.id).toEqual(createdProduct.id);
    });

    it('index method should return a list of products', async () => {
      const result = await pStore.index();
      expect(result.length).toBe(1);
      expect(result[0].name).toEqual(createdProduct.name);
      expect(result[0].price).toEqual(createdProduct.price);
      expect(result[0].id).toEqual(createdProduct.id);
    });

    it('show method should return the correct product', async () => {
      const result = await pStore.show('1');
      expect(result.name).toEqual(createdProduct.name);
      expect(result.price).toEqual(createdProduct.price);
      expect(result.id).toEqual(createdProduct.id);
    });
  });

  describe('Order Model', () => {
    beforeAll(async () => {
      const conn = await client.connect();
      const sql = `DELETE FROM users;
      ALTER SEQUENCE users_id_seq RESTART WITH 1;
      DELETE FROM products;
      ALTER SEQUENCE products_id_seq RESTART WITH 1;
      `;
      await conn.query(sql);
      await uStore.create(newUser);
      await pStore.create(newProduct);
      conn.release();
    });

    it('should have a create method', () => {
      expect(oStore.create).toBeDefined();
    });

    it('create method should add an order', async () => {
      const result = await oStore.create(newOrder);
      expect(result.user_id).toEqual(createdOrder.user_id);
      expect(result.status).toEqual(createdOrder.status);
      expect(result.id).toEqual(createdOrder.id);
    });

    it('addProduct method should return the new order product item', async () => {
      const result = await oStore.addProduct(
        newOrderProduct.quantity,
        newOrderProduct.order_id,
        newOrderProduct.product_id
      );
      expect(result.id).toEqual(1);
      expect(result.order_id).toEqual(newOrderProduct.order_id);
      expect(result.product_id).toEqual(newOrderProduct.product_id);
      expect(result.quantity).toEqual(newOrderProduct.quantity);
    });

    it('getUserOrders method should return a list of orders for this user', async () => {
      const result = await oStore.getUserOrders(createdUser.id as number);
      expect(result.length).toBe(1);
      expect(result[0].user_id).toEqual(createdOrder.user_id);
      expect(result[0].status).toEqual(createdOrder.status);
      expect(result[0].id).toEqual(createdOrder.id);
    });

    it('setOrderStatus method should update the order status', async () => {
      const result = await oStore.setOrderStatus(
        createdOrder.id as number,
        'complete'
      );
      expect(result.user_id).toEqual(createdOrder.user_id);
      expect(result.status).toEqual('complete');
      expect(result.id).toEqual(createdOrder.id);
    });
  });
});
