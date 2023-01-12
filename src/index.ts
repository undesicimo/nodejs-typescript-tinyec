import express, { json } from 'express';
import router from './routes';


const app = express();
app.use(json());
app.use('/', router);

const port = process.env.PORT ? Number(process.env.PORT) : 8080;
app.listen(port, () => {
  console.log(`Express Server Started on Port: ${port}`);
});
