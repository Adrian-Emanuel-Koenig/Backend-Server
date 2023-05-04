"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.configCors = void 0;
exports.configCors = {
    origin: (_a = process.env.URL_PERMISSION) === null || _a === void 0 ? void 0 : _a.split(","),
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
};
