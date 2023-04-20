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
config();

const app: express.Application = express();
const port: number = 8080;

app.use(cors(configCors));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(sessionMongo());
app.use(passport.initialize());
app.use(passport.session());
app.use("/", routerProducts);
app.use("/", routerUsers);
app.enable("trust proxy");

// const server = http.createServer(app);
// const io = new SocketServer(server);
// io.on("connection", (socket) => {
//   console.log('user connected')
//   console.log(socket.id)

//   socket.on("message", (message, nickname) => {
//     console.log(message);
//     //Envio al resto de clientes con broadcast.emit
//     socket.broadcast.emit("message", {
//       body: message,
//       from: nickname,
//     });
//   });
// });


app.listen(port, async () => {
  await connectionMDB;
  logger.info(`Server on: http://localhost:${port}`);
});
