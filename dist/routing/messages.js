"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerMessages = void 0;
const express_1 = require("express");
exports.routerMessages = (0, express_1.Router)();
exports.routerMessages.get("/api/messages");
exports.routerMessages.post("/api/messages");
