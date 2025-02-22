import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { DataStoredInToken, RequestWithInfo } from "@/interfaces/requestWithRole";
import ErrorHandler from "@/utils/error";
import userModel from "@/models/user.model";
import { SECRET_KEY } from "@/utils/variables";

const authMiddleware = (type: string) => {
  return async (req: RequestWithInfo, res: Response, next: NextFunction) => {
    try {
      const accessHeaders = req.header("Authorization")
        ? req.header("Authorization")?.split("Bearer ")[1] || null
        : null;

      const Authorization = type === "access" ? accessHeaders : req.cookies["refresh"];
      if (Authorization) {
        const verificationResponse = verify(
          Authorization,
          type === "refresh" ? SECRET_KEY : (process.env.ACCESS_SECRET as string)
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
      next(new ErrorHandler(401, "Wrong authentication token"));
    }
  };
};

export default authMiddleware;
