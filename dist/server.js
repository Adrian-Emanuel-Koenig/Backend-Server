"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = require("./routing/products");
const users_1 = require("./routing/users");
const connection_1 = require("./database/connection/connection");
const winston_1 = __importDefault(require("./utils/logger/winston"));
const passport_1 = __importDefault(require("passport"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const corsConfig_1 = require("./config/corsConfig");
const dotenv_1 = require("dotenv");
const session_1 = require("./database/connection/session");
const socket_io_1 = require("socket.io");
const messages_1 = require("./routing/messages");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const port = 8080;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, { cors: {} });
app.use((0, cors_1.default)(corsConfig_1.configCors));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, session_1.sessionMongo)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/", products_1.routerProducts);
app.use("/", users_1.routerUsers);
app.use("/", messages_1.routerMessages);
app.enable("trust proxy");
io.on("connection", (socket) => {
    console.log("user connected");
    console.log(socket.id);
    socket.on("message", (message, nickname) => {
        console.log(message);
        socket.emit("message", {
            body: message,
            username: nickname,
        });
    });
});
server.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.connectionMDB;
    winston_1.default.info(`Server on: http://localhost:${port}`);
}));
