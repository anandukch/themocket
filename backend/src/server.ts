import express, { Application, ErrorRequestHandler, RequestHandler } from "express";
import { Server as HttpServer } from "http";
import cors from "cors";
import cookieParser from "cookie-parser";

import Controller from "./controller/controller";
import { connectDatabase } from "./db";
import UserRepository from "./repositories/user.repository";
import UserService from "./services/user.service";
import requestLogger from "./middlewares/requestLogger";
import { errorHandler, Handler404 } from "./middlewares/errorHandler";
// import { NODE_ENV } from "./utils/variables";
import { logger } from "./utils/logger";
import { NODE_ENV } from "./utils/variables";
import UserController from "./controller/user.controller";
import ProjectController from "./controller/project.controller";
import MocketRepository from "./repositories/mocket.repository";
import ProjectRepository from "./repositories/project.repository";
import ProjectService from "./services/project.service";
import MocketService from "./services/mocket.service";
import MocketController from "./controller/mocket.controller";
import AuthController from "./controller/auth.controller";
import AuthService from "./services/auth.service";

export default class Server {
  public app: Application;

  private readonly port: number | string;

  private readonly env: string;

  constructor(app: Application, port: number | string) {
    this.app = app;
    this.port = port;
    this.env = NODE_ENV;
  }

  public start(): HttpServer {
    this.exceptionHandler();
    return this.app.listen(this.port, () => {
      logger.info(`=================================`);
      logger.info(`======= ENV: ${this.env} =======`);
      logger.info(`🚀 App listening on the http://localhost:${this.port}`);
      logger.info(`=================================`);
    });
  }
  private exceptionHandler(): void {
    process
      .on("uncaughtException", (err) => {
        console.error("Uncaught Exception: ", err);
      })
      .on("unhandledRejection", (reason, p) => {
        console.error("Unhandled Rejection at: Promise ", p, " reason: ", reason);
      });
  }
  public connectToDatabase() {
    // dbConnection.initialize();
    connectDatabase();
  }

  public loadGlobalMiddleWares(middlewares: RequestHandler[]): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  public loadControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use(controller.path, controller.routerMiddleWares, controller.setRoutes());
    });
  }

  public loadErrorHandlers(errorHandlers: Array<RequestHandler | ErrorRequestHandler>): void {
    errorHandlers.forEach((errorHandler) => {
      this.app.use(errorHandler);
    });
  }
}

export const StartServer = (app: Application, port: number | string) => {
  const server = new Server(app, port || 3000);
  // repository

  const userRepository = new UserRepository();
  const mocketRepository = new MocketRepository();
  const projectRepository = new ProjectRepository();
  // service
  const projectService = new ProjectService(projectRepository);
  const userService = new UserService(userRepository);
  const authService = new AuthService(userService);
  const mocketService = new MocketService(mocketRepository, userService, projectService);

  // controllers
  const controllers: Controller[] = [
    new AuthController(authService),
    new UserController(userService),
    new ProjectController(projectService),
    new MocketController(mocketService),
  ];
  const globalMiddlewares: RequestHandler[] = [
    express.json(),
    cookieParser(),
    express.urlencoded({ extended: true }),
    requestLogger,
    cors({
      origin: ["http://localhost:3000", "http://localhost:3001"],
      credentials: true,
    }),

    // NODE_ENV ? vhost("*.*.*", app) : (_req, _res, next) => next(),
  ];
  const errorHandlers: Array<RequestHandler | ErrorRequestHandler> = [Handler404, errorHandler];
  server.connectToDatabase();

  server.loadGlobalMiddleWares(globalMiddlewares);
  server.loadControllers(controllers);
  server.loadErrorHandlers(errorHandlers);
  server.start();
};
