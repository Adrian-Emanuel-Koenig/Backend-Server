import { config } from "dotenv";
import session = require("express-session");
import MongoStore = require("connect-mongo");
import logger from "../../utils/logger/winston";
config();

export const sessionMongo = (): any => {
  try {
    if (process.env.SECRET_KEY) {
      const sessionCookies = session({
        store: new MongoStore({
          mongoUrl: process.env.MONGO_URI,
        }),
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: { maxAge: 60 * 10000 },
      });
      logger.log("info", "Session MongoDB online");
      return sessionCookies;
    }
  } catch (err) {
    logger.info(err);
  }
};
