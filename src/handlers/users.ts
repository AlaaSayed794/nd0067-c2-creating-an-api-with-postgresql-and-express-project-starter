import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const users = await store.index();
  res.json(users);
};

const show = async (req: Request, res: Response) => {
  const user = await store.show(req.params.id);
  res.json(user);
};

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password
    };

    const newUser = await store.create(user);
    const token = jwt.sign(
      {
        user: {
          first_name: newUser.first_name,
          last_name: newUser.last_name,
          id: newUser.id
        }
      },
      tokenSecret as string
    );
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const destroy = async (req: Request, res: Response) => {
  const deleted = await store.delete(req.body.id);
  res.json(deleted);
};

const authenticate = async (req: Request, res: Response) => {
  const user = await store.authenticate(req.body.user_name, req.body.password);
  res.json(user);
};

const userRoutes = (app: express.Application): void => {
  app.get('/users', index);
  app.get('/users/:id', show);
  app.post('/users', create);
  app.delete('/users', destroy);
  app.post('/authenticate', authenticate);
};

export default userRoutes;
