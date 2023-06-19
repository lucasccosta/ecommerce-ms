import { app } from "./app";
import "./infra/provider/kafka/consumers/index"

const PORT = 3332;

const server = app.listen(PORT, () => console.log(`App running at port http://locahost:${PORT}`));

process.on("SIGINT", () =>{
  server.close();
  console.log("App is down");
})