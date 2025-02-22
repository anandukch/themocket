import AuthService from "@/services/auth.service";
import Controller, { IRoute, Methods } from "./controller";
import { CookieOptions, NextFunction, Request, Response } from "express";
import Token from "@/entities/token.entity";
import { GoogleUserDto } from "@/dtos/user.dto";
import { NODE_ENV, REFRESH_EXPIRES, REFRESH_SECRET } from "@/utils/variables";

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
      handler: this.redirectUrl.bind(this),
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
        Number(REFRESH_EXPIRES)
      ).sign();
      res.cookie("refresh", refreshToken, this.cookieOptions);
      res.redirect("http://localhost:3000");
      // const token = await this.authService.createToken(googleUser as User);
      // res.status(200).json({ data: googleUser, message: "login" });
    } catch (error) {
      console.log(error);

      next(error);
    }
  }
}
