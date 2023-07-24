import http from "http";
import cors from "cors";
import express, { Application } from "express";
import { createHttpTerminator } from "http-terminator";

import "./app.process";
import appConfig from "./config";
import AppRoute from "@route/app.route";
import AppException from "@exception/app.exception";

const app: Application = express();
const serverPort = Number(appConfig.server.port);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

AppRoute(app);
AppException(app);

export const server = http.createServer(app);
export const httpTerminator = createHttpTerminator({ server });

server.listen(serverPort, () => {
  console.log(`App listening port : ${serverPort}`);
  console.log(`App listening environment : ${process.env.ENV_NAME}`);
});
