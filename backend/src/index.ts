import { config } from "dotenv";
// import Logger from "./utils/logger";

import express from "express";
config();
import { StartServer } from "./server";
import { PORT } from "./utils/variables";


function main() {
  const app = express();
  StartServer(app, PORT);
}
main();
