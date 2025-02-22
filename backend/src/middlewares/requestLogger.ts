import { Logger } from "@/utils/logger";
import { Request, Response, NextFunction } from "express";

const logger = Logger.getLogger("RequestLogger");

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  res.on("finish", () => {
    const elapsedTime = Date.now() - startTime;
    logger.info(`${req.method} ${req.originalUrl} - ${res.statusCode} [${elapsedTime}ms]`);
  });

  next();
};

export default requestLogger;
