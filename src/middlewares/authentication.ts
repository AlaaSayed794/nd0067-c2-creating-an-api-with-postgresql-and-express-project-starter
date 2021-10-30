//https://stackoverflow.com/questions/12921658/use-specific-middleware-in-express-for-all-paths-except-a-specific-one
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const openRequests: boolean =
    req.path == '/authenticate' || req.path == '/' ||
    (req.method == 'GET' && req.path.startsWith('/products'));

  if (openRequests) return next();
  try {
    const ourToken = process.env.TOKEN_SECRET as Secret;
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, ourToken);
    return next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
  }
}
