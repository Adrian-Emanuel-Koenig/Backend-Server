import express from "express";
import logger from "./utils/logger/winston";
import passport from "passport";
import http from "http";
import cors from "cors";
import { routerProducts } from "./routing/products";
import { routerUsers } from "./routing/users";
import { routerMessages } from "./routing/messages";
import { routerCart } from "./routing/cart";
import { configCors } from "./config/corsConfig";
import { config } from "dotenv";
import { connectionMDB } from "./database/connection/connection";
import { sessionMongo } from "./database/connection/session";
import { configureSocket } from "./database/connection/socket";

config();

const app: express.Application = express();
const server = http.createServer(app);
const io = configureSocket(server);

app.use(cors(configCors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMongo());
app.use(passport.initialize());
app.use(passport.session());

app.use("/", routerProducts);
app.use("/", routerUsers);
app.use("/", routerMessages);
app.use("/", routerCart);
app.enable("trust proxy");

server.listen(process.env.PORT, async () => {
  await connectionMDB;
  logger.info(`Server on: http://localhost:${process.env.PORT}`);
});
