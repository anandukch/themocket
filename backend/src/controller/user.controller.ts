import { NextFunction, Request, Response } from "express";
import Controller, { IRoute, Methods } from "./controller";
import UserService from "@/services/user.service";
import validationMiddleware from "@/middlewares/requestValidator";
import { RequestWithInfo } from "@/interfaces/requestWithRole";
import authMiddleware from "@/middlewares/authMiddleware";

export default class UserController extends Controller {
  constructor(private service: UserService) {
    super();
  }
  path = "/users";
  routerMiddleWares = [];

  routes: IRoute[] = [
    {
      path: "/me",
      method: Methods.GET,
      handler: this.getMe.bind(this),
      localMiddleWares: [authMiddleware("access")],
    },
    {
      path: "/:id",
      method: Methods.GET,
      handler: this.getUser.bind(this),
      localMiddleWares: [],
    },

    
  ];

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await this.service.getUserById(userId);

      res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  }

  async getMe(req: RequestWithInfo, res: Response, next: NextFunction) {
    try {
      console.log("user id", req.user?.userId);
      
      if (!req.user?.userId) {
        throw new Error("User ID is missing");
      }
      const user = await this.service.getUserById(req.user.userId);
      console.log("getme", user);
      
      res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  }
}
