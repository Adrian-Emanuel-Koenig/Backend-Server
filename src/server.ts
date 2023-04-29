import express from "express";
import { routerProducts } from "./routing/products";
import { routerUsers } from "./routing/users";
import { connectionMDB } from "./database/connection/connection";
import logger from "./utils/logger/winston";
import passport from "passport";
import http from "http";
import cors from "cors";
import { configCors } from "./config/corsConfig";
import { config } from "dotenv";
import { sessionMongo } from "./database/connection/session";
import { Server as SocketServer } from "socket.io";
import { routerMessages } from "./routing/messages";
import { routerCart } from "./routing/cart";
config();

const app: express.Application = express();
const port: number = 8080;
const server = http.createServer(app);
const io = new SocketServer(server, { cors: {} });

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

io.on("connection", (socket) => {
  socket.on("message", (message, nickname) => {
    socket.emit("message", {
      body: message,
      username: nickname,
    });
  });
});

server.listen(port, async () => {
  await connectionMDB;
  logger.info(`Server on: http://localhost:${port}`);
});
