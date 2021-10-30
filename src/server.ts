import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/users';
import productRoutes from './handlers/products';
import orderRoutes from './handlers/orders';
import { authenticate } from './middlewares/authentication';
const app: express.Application = express();
const address = '0.0.0.0:3000';

app.use(bodyParser.json());
app.all('*', authenticate);

app.get('/', function (_req: Request, res: Response) {
  res.sendFile(__dirname + '/views/index.html');
});

userRoutes(app);
productRoutes(app);
orderRoutes(app);

app.listen(3000, function () {
  const msg: string = 'starting app on: ' + address;
  console.log(msg);
});

export default app;
