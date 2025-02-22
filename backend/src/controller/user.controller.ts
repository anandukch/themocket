import { NextFunction, Request, Response } from "express";
import Controller, { IRoute, Methods } from "./controller";
import UserService from "@/services/user.service";
import validationMiddleware from "@/middlewares/requestValidator";
import { RequestWithInfo } from "@/interfaces/requestWithRole";

export default class UserController extends Controller {
  constructor(private service: UserService) {
    super();
  }
  path = "/users";
  routerMiddleWares = [];

  routes: IRoute[] = [
    // {
    //   path: "/",
    //   method: Methods.GET,
    //   handler: this.getAllUsers.bind(this),
    //   localMiddleWares: [],
    // },
    {
      path: "/:id",
      method: Methods.GET,
      handler: this.getUser.bind(this),
      localMiddleWares: [],
    },

  ];

  // async getAllUsers(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const users = await this.service.getUser();
  //     res.status(200).json(users);
  //   } catch (err) {
  //     return next(err);
  //   }
  // }
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.id;
      const user = await this.service.getUserById(userId);

      res.status(200).json(user);
    } catch (err) {
      return next(err);
    }
  }

 
}
