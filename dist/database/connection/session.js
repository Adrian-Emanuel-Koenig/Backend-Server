"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionMongo = void 0;
const dotenv_1 = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const winston_1 = __importDefault(require("../../utils/logger/winston"));
(0, dotenv_1.config)();
const sessionMongo = () => {
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
            winston_1.default.log("info", "Session MongoDB online");
            return sessionCookies;
        }
    }
    catch (err) {
        winston_1.default.info(err);
    }
};
exports.sessionMongo = sessionMongo;
