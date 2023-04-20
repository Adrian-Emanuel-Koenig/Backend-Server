"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerUsers = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const passport_config_1 = require("../utils/middleware/passport-config");
exports.routerUsers = (0, express_1.Router)();
exports.routerUsers.get("/api/username", (req, res) => {
    const username = req.user;
    res.json(username);
});
exports.routerUsers.post("/api/login", passport_1.default.authenticate(passport_config_1.passLog), (req, res) => {
    const username = req.user;
    const nombre = username.username;
    console.log(nombre);
    res.json("Usuario conectado: " + nombre);
});
exports.routerUsers.post("/api/signup", passport_1.default.authenticate(passport_config_1.passSign), (req, res) => {
    res.json("Hello");
});
exports.routerUsers.get("/api/logout", (req, res) => {
    const username = req.user;
    const nombre = username.username;
    req.session.destroy((err) => {
        if (err) {
            console.log("Error al desloguear");
        }
        else {
            console.log(nombre + " deslogueado");
        }
        res.json(nombre + " deslogueado");
    });
});
exports.routerUsers.put("/api/users/:id");
exports.routerUsers.delete("/api/users/:id");
