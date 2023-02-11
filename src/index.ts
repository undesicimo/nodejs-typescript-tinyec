import { app } from "./app";

const port = process.env.PORT ? Number(process.env.PORT) : 8080;
app.listen(port, () => {
  console.log(`Express Server Started on Port: ${port}`);
});
