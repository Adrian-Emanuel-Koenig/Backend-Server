"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMessages = void 0;
const express_1 = require("express");
const messages_1 = require("../controller/messages");
exports.routerMessages = (0, express_1.Router)();
exports.routerMessages.get("/api/messages/", messages_1.readAllController);
exports.routerMessages.get("/api/messages/:username", messages_1.readOneController);
exports.routerMessages.post("/api/messages", messages_1.createController);
