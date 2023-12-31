import "reflect-metadata"
import "./shared/container/index"
import "./shared/provider/index"
import express from "express";
import bodyParser from "body-parser";
import { router } from "./routes";

const app = express();
app.use(bodyParser.json());

app.use(router);

export { app };
