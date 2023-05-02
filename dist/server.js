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
const winston_1 = __importDefault(require("./utils/logger/winston"));
const passport_1 = __importDefault(require("passport"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const products_1 = require("./routing/products");
const users_1 = require("./routing/users");
const messages_1 = require("./routing/messages");
const cart_1 = require("./routing/cart");
const corsConfig_1 = require("./config/corsConfig");
const dotenv_1 = require("dotenv");
const connection_1 = require("./database/connection/connection");
const session_1 = require("./database/connection/session");
const socket_1 = require("./database/connection/socket");
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = (0, socket_1.configureSocket)(server);
app.use((0, cors_1.default)(corsConfig_1.configCors));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, session_1.sessionMongo)());
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/", products_1.routerProducts);
app.use("/", users_1.routerUsers);
app.use("/", messages_1.routerMessages);
app.use("/", cart_1.routerCart);
app.enable("trust proxy");
server.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield connection_1.connectionMDB;
    winston_1.default.info(`Server on: http://localhost:${process.env.PORT}`);
}));
