// a middwlare function to validate the headers of the request and check if it ahs X-User-Id and X-Project-Id and add it to the request object

import { Request, Response, NextFunction } from "express";
import ErrorHandler from "@/utils/error";
import { RequestWithInfo } from "@/interfaces/requestWithRole";
import { Logger } from "@/utils/logger";

const logger = Logger.getLogger("HeaderValidator");

export const headerValidator = (req: RequestWithInfo, res: Response, next: NextFunction) => {
  if (!req.headers["x-user-id"]) {
    const err = new ErrorHandler(400, "X-User-Id is required");
    logger.error(
      `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    return next(err);
  }
  if (!req.headers["x-project-id"]) {
    const err = new ErrorHandler(400, "X-Project-Id is required");
    logger.error(
      `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
    );
    return next(err);
  }
  req.userId = req.headers["x-user-id"] as string;
  req.projectId = req.headers["x-project-id"] as string;
  next();
};
