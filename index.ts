import express from "express";
import morgan from "morgan";
import * as middlewares from './middlewares';
import * as routes from './routes';

const app: express.Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(routes.expenseRouter)
app.use(middlewares.zodErrorHandler);

const port: number = 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});