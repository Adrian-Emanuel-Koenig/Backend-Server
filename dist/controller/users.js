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
exports.logout = exports.getUsername = exports.createController = void 0;
const users_1 = require("../service/users");
const winston_1 = __importDefault(require("../utils/logger/winston"));
const createController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, users_1.createService)(req.body);
        res.status(201).json({
            status: true,
            message: "User successfully saved",
        });
    }
    catch (error) {
        winston_1.default.error(error, `${error}`);
    }
});
exports.createController = createController;
const getUsername = (req, res) => {
    const username = req.user;
    const nombre = username.username;
    res.json({
        status: true,
        username: nombre
    });
};
exports.getUsername = getUsername;
const logout = (req, res) => {
    const username = req.user;
    const nombre = username.username;
    req.session.destroy((err) => {
        if (err) {
            winston_1.default.info("Error al desloguear" + err);
        }
        else {
            winston_1.default.info(nombre + " deslogueado");
        }
        res.json(nombre + " deslogueado");
    });
};
exports.logout = logout;
