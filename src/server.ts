import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/users';
const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());

app.get('/', function(_req: Request, res: Response) {
  res.send('Hello World!');
});

userRoutes(app);

app.listen(3000, function() {
  const msg: string = 'starting app on: ' + address;
  console.log(msg);
});
