import { resolve } from "path";
import { cwd } from "node:process";
import { existsSync } from "node:fs";

import * as dotenv from "dotenv";
import { cleanEnv, str } from "envalid";

import appDev from "./app/app.dev";
import appPro from "./app/app.pro";

let appConfig: any = {};

const envReqVar = {
  ENV_NAME: str(),
};

const setEnvConfig = () => {
  if (process.env.ENV_NAME === "DEV" && existsSync(".env")) {
    dotenv.config({ path: resolve(cwd(), ".env") });
  }

  cleanEnv(process.env, envReqVar);
};

const setAppConfig = () => {
  switch (process.env["ENV_NAME"]) {
    case "DEV":
      appConfig = appDev;
      break;
    case "PRO":
      appConfig = appPro;
      break;
    default:
      appConfig = appDev;
  }
};

setEnvConfig();
setAppConfig();

export default appConfig;
