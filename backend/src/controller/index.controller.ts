import { NextFunction, Request, Response } from "express";
import Controller, { CustomRequestHandler, IRoute, Methods } from "./controller";
import { RequestWithInfo } from "@/interfaces/requestWithRole";
import MocketService from "@/services/mocket.service";

export default class IndexController extends Controller {
  constructor(private mocketService: MocketService) {
    super();
  }
  path = "";
  routerMiddleWares = [];
  triggerPath = "/:projectId/*";
  routes: IRoute[] = [
    ...this.setTriggerRoutes(this.index.bind(this)),
    {
      path: "/health",
      method: Methods.GET,
      handler: (req: Request, res: Response) => {
        res.status(200).json({ status: "UP" });
      },
    },
  ];

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.mocketService.trigger(req);
      res.status(200).json(result);
    } catch (error) {
      console.log(error);

      return next(error);
    }
  }

  private setTriggerRoutes(handler: CustomRequestHandler): IRoute[] {
    return [Methods.GET, Methods.POST, Methods.PUT, Methods.DELETE].map((method) => {
      return {
        path: this.triggerPath,
        method: method,
        handler: handler,
        localMiddleWares: [],
      };
    });
  }
}
