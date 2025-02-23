import AuthService from "@/services/auth.service";
import Controller, { IRoute, Methods } from "./controller";
import { CookieOptions, NextFunction, Request, Response } from "express";
import Token from "@/entities/token.entity";
import { GoogleUserDto } from "@/dtos/user.dto";
import { NODE_ENV, REFRESH_EXPIRES, REFRESH_SECRET } from "@/utils/variables";
import { RequestWithInfo } from "@/interfaces/requestWithRole";
import ErrorHandler from "@/utils/error";
import authMiddleware from "@/middlewares/authMiddleware";

export default class AuthController extends Controller {
  private cookieOptions: CookieOptions = {
    httpOnly: NODE_ENV === "production" ? true : false,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    secure: true,
    signed: NODE_ENV === "production" ? true : false,
    sameSite: "lax",
  };
  constructor(private authService: AuthService) {
    super();
  }

  path = "/auth";

  routerMiddleWares = [];

  routes: IRoute[] = [
    {
      path: "/google",
      method: Methods.GET,
      handler: this.redirectUrl.bind(this),
    },
    {
      path: "/google/callback",
      method: Methods.GET,
      handler: this.callBackAuth.bind(this),
    },
    {
      path: "/tokens",
      method: Methods.GET,
      handler: this.getAccessToken.bind(this),
      localMiddleWares: [authMiddleware("refresh")],
    },
  ];

  async redirectUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const url = this.authService.getUrl();
      res.redirect(url);
    } catch (error) {
      return next(error);
    }
  }

  async callBackAuth(req: Request, res: Response, next: NextFunction) {
    try {
      const code = req.query.code as string;
      const googleUser = await this.authService.getGoogleAccountFromCode(code);
      let user = await this.authService.createGoogleUser(googleUser);
      if (!user) throw new Error("User not found");
      const refreshToken = new Token(
        {
          userId: user._id as string,
          email: user.email,
          login: true,
          //   username: user.name,
        },

        REFRESH_SECRET,
        REFRESH_EXPIRES
      ).sign();

      res.cookie("refresh", refreshToken, this.cookieOptions);
      res.redirect("http://localhost:3000/dashboard");
    } catch (error) {
      console.log(error);

      next(error);
    }
  }

  async getAccessToken(req: RequestWithInfo, res: Response, next: NextFunction) {
    try {

      const token = await this.authService.generateAccessToken(req.user?.email as string);
      res.status(200).json({ data: token, message: "login" });
    } catch (error) {
      next(error);
    }
  }
}
