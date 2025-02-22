import ErrorHandler from "@/utils/error";
import { Logger } from "@/utils/logger";
import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const logger = Logger.getLogger("ErrorHandler");
interface ErrorResponse {
  status: number;
  message: string;
  errors: string[];
  stack?: string;
}

export const errorHandler = (
  err: ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction // eslint-disable-line
) => {
  /* eslint no-param-reassign: "off" */
  err.message = err.message || "Internal Sever Error";
  err.statusCode = err.statusCode || 500;

  let response: ErrorResponse;

  if (process.env.NODE_ENV === "development") {
    response = {
      status: err.statusCode,
      message: err.message,
      errors: [err.message],
      stack: err.stack,
    };
  } else {
    response = {
      status: err.statusCode,
      message: err.message,
      errors: [err.message],
    };
  }

  if (err.message === "Validation Error") {
    const errors = validationResult(req);
    response.errors = errors.array().map((error) => error.msg);
  }
  logger.error(
    `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  res.status(err.statusCode).json(response);
  next();
};

export const Handler404 = (req: Request, res: Response) => {
  const err = new ErrorHandler(404, "Not Found");
  logger.error(
    `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`
  );
  res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
};
