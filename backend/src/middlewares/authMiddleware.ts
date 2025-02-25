import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { DataStoredInToken, RequestWithInfo } from "@/interfaces/requestWithRole";
import ErrorHandler from "@/utils/error";
import userModel from "@/models/user.model";
import { ACCESS_SECRET, REFRESH_SECRET, SECRET_KEY } from "@/utils/variables";

const authMiddleware = (type: "access" | "refresh") => {
  return async (req: RequestWithInfo, res: Response, next: NextFunction) => {
    try {
      const accessHeaders = req.header("Authorization")
        ? req.header("Authorization")?.split("Bearer ")[1] || null
        : null;

      // const Authorization = type === "access" ? accessHeaders : req.cookies["refresh"];
      const Authorization = req.cookies["refresh"];
      console.log("authMiddleware", Authorization);
      
      if (Authorization) {
        const verificationResponse = verify(
          Authorization,
          // type === "refresh" ? REFRESH_SECRET : ACCESS_SECRET
          REFRESH_SECRET
        ) as unknown as DataStoredInToken;

        const findUser = await userModel.findById(verificationResponse.userId);

        if (findUser) {
          req.user = verificationResponse;
          next();
        } else {
          next(new ErrorHandler(401, "Wrong authentication token"));
        }
      } else {
        next(new ErrorHandler(404, "Authentication token missing"));
      }
    } catch (error) {
      console.log(type, error);

      next(new ErrorHandler(401, "Wrong authentication token"));
    }
  };
};

export default authMiddleware;
