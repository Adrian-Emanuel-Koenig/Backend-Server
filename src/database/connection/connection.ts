import { config } from "dotenv";
config();

import mongoose, { ConnectOptions } from "mongoose";
import logger from "../../utils/logger/winston";
const connect = mongoose.connect;

mongoose.set("strictQuery", true);

interface CustomConnectOptions extends ConnectOptions {
  useNewUrlParser: boolean;
}

async function connection() {
  try {
    await connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
    } as CustomConnectOptions);
    logger.info("Connected to MongoDB Atlas");
  } catch (error) {
    logger.error(error);
    throw new Error("Can not connect to the database");
  }
}

export const connectionMDB = connection();
