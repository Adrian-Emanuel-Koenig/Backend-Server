"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsers = void 0;
const express_1 = require("express");
const users_1 = require("../controller/users");
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("../utils/middleware/passport-config");
const auth_1 = require("../utils/middleware/auth");
exports.routerUsers = (0, express_1.Router)();
exports.routerUsers.get("/api/username", auth_1.isAuth, users_1.getUsername);
exports.routerUsers.post("/api/login", passport_1.default.authenticate(passport_config_1.passLog), users_1.getUsername);
exports.routerUsers.post("/api/signup", passport_1.default.authenticate(passport_config_1.passSign), users_1.getUsername);
exports.routerUsers.get("/api/logout", users_1.logout);
