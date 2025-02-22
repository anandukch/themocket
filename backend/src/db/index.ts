import { logger } from "@/utils/logger";
import { MONGO_URI, NODE_ENV } from "@/utils/variables";
import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
   if (NODE_ENV != "production") {
      mongoose.set("debug", true);
    }
  try {
    await mongoose.connect(MONGO_URI, {});
    logger.info("📦 Connected to database");
   
  } catch (error) {
    logger.error(`❌ Error connecting to database: ${error}`);
    process.exit(1);
  }
};
