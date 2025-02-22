import { RequestWithInfo } from "@/interfaces/requestWithRole";
import { Router, RequestHandler, Request, NextFunction, Response } from "express";

// HTTP method
export enum Methods {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export interface CustomRequestHandler {
  (
    req: Request<any, any, any, any> & Partial<RequestWithInfo>,
    res: Response,
    next: NextFunction
  ): any;
}
export interface IRoute {
  path: string;
  method: Methods;
  handler: CustomRequestHandler;
  localMiddleWares?: CustomRequestHandler[];
}

export default abstract class Controller {
  // express router
  public router: Router = Router();

  // base path for all routes in this controller
  public abstract path: string;

  // routers under the controller
  public abstract readonly routes: IRoute[];

  // middleware of all routes under this router
  public abstract readonly routerMiddleWares: RequestHandler[] | [];

  public setRoutes(): Router {
    // eslint-disable-next-line
    for (const route of this.routes) {
      switch (route.method) {
        case "GET":
          this.router.get(route.path, route.localMiddleWares || [], route.handler);
          break;
        case "POST":
          this.router.post(route.path, route.localMiddleWares || [], route.handler);
          break;
        case "PUT":
          this.router.put(route.path, route.localMiddleWares || [], route.handler);
          break;
        case "DELETE":
          this.router.delete(route.path, route.localMiddleWares || [], route.handler);
          break;
        default:
          break;
      }
    }
    return this.router;
  }
}
