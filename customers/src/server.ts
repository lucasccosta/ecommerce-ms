import { app } from "./app";

const PORT = 3333;

const server = app.listen(PORT, () => console.log(`App running at port http://locahost:${PORT}`));

process.on("SIGINT", () =>{
  server.close();
  console.log("App is down");
})