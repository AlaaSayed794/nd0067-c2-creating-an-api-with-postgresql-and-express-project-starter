import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

const store = new UserStore();

const create = async (req: Request, res: Response) => {
  try {
    const user: User = {
      user_name: req.body.user_name,
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
    res.status(400).json((err as Error).message);
  }
};

const authenticate = async (req: Request, res: Response) => {
  const user = (await store.authenticate(
    req.body.user_name,
    req.body.password
  )) as User;
  try {
    const u = await store.authenticate(user.user_name, user.password);
    const token = jwt.sign({ user: u }, process.env.TOKEN_SECRET as Secret);
    res.json(token);
  } catch (error) {
    res.status(401);
    res.json({ error: 'incorrect user and/or password' });
  }
};

const userRoutes = (app: express.Application): void => {
  app.post('/users', create);
  app.post('/authenticate', authenticate);
};

export default userRoutes;
