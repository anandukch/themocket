import { NextFunction, Request, Response } from "express";
import Controller, { IRoute, Methods } from "./controller";
import MocketService from "@/services/mocket.service";
import { CreateMocketDto } from "@/dtos/mocket.dto";
import { RequestWithInfo } from "@/interfaces/requestWithRole";
import authMiddleware from "@/middlewares/authMiddleware";

export default class MocketController extends Controller {
  constructor(private service: MocketService) {
    super();
  }
  path = "/mockets";
  routerMiddleWares = [];

  routes: IRoute[] = [
    {
      path: "/",
      method: Methods.GET,
      handler: this.getAll.bind(this),
      localMiddleWares: [authMiddleware("access")],
    },
    {
      path: "/",
      method: Methods.POST,
      handler: this.create.bind(this),
      localMiddleWares: [authMiddleware("access")],
    },
    {
      path: "/:id",
      method: Methods.GET,
      handler: this.getMocket.bind(this),
      localMiddleWares: [authMiddleware("access")],
    },
  ];

  async index(req: Request, res: Response) {
    res.send("Hello World");
  }

  async getMocket(req: RequestWithInfo, res: Response, next: NextFunction) {
    try {
      const mocket = await this.service.getMocket(req.params.id);
      res.status(200).json(mocket);
    } catch (e) {
      return next(e);
    }
  }
  async getAll(req: RequestWithInfo, res: Response, next: NextFunction) {
    try {
      const mockets = await this.service.getMockets(req.user?.userId!);

      res.status(200).json(mockets);
    } catch (e) {
      return next(e);
    }
  }

  async create(req: RequestWithInfo, res: Response, next: NextFunction) {
    try {
      if (!req.user?.userId) {
        return next(new Error("User not found"));
      }
      const mocket = await this.service.createMocket(req.body as CreateMocketDto, req.user.userId);
      res.status(201).json(mocket);
    } catch (e) {
      console.log(e);

      return next(e);
    }
  }
}
