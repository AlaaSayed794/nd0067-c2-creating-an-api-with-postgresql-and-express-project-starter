import express, { Request, Response } from 'express';
import { Order, OrderStore } from '../models/order';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const orders = await store.index();
  res.json(orders);
};

const show = async (req: Request, res: Response) => {
  const order = await store.show(req.params.id);
  res.json(order);
};

const create = async (req: Request, res: Response) => {
  try {
    const order: Order = {
      status: req.body.status,
      user_id: req.body.user_id
    };

    const newOrder = await store.create(order);

    res.json(newOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const addProduct = async (req: Request, res: Response) => {
  try {
    const orderId: number = parseInt(req.params.id);
    const productId: number = parseInt(req.body.product_id);
    const quantity: number = parseInt(req.body.quantity);
    const addedProduct = await store.addProduct(quantity, orderId, productId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const getUserOrders = async (req: Request, res: Response) => {
  const userId: number = parseInt(req.params.id);

  try {
    const addedProduct = await store.getUserOrders(userId);
    res.json(addedProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const setOrderStatus = async (req: Request, res: Response) => {
  try {
    const orderId: number = parseInt(req.params.id);
    const status: string = req.body.status;
    const order = await store.setOrderStatus(orderId, status);
    res.json(order);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const orderRoutes = (app: express.Application): void => {
  app.get('/orders', index);
  app.get('/orders/:id', show);
  app.post('/orders', create);
  app.delete('/orders', destroy);
  app.post('/orders/:id/products', addProduct);
  app.get('/users/:id/orders', getUserOrders);
  app.patch('orders/:id', setOrderStatus);
};

export default orderRoutes;
