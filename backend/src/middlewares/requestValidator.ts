import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import ValidationException from "../exceptions/validationException";

const validationMiddleware = (dto: any) => {
  return async (req: Request, _: Response, next: NextFunction) => {
    try {
      const schema = plainToInstance(dto, req.body);
      const errors = await validate(schema);
      if (errors.length) {
        console.log(errors);

        throw new ValidationException(400, "Validation Failed", errors);
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default validationMiddleware;
