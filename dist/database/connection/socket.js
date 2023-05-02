"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSocket = void 0;
const socket_io_1 = require("socket.io");
const configureSocket = (server) => {
    const io = new socket_io_1.Server(server, { cors: {} });
    io.on("connection", (socket) => {
        socket.on("message", (message, nickname) => {
            socket.emit("message", {
                body: message,
                username: nickname,
            });
        });
    });
    return io;
};
exports.configureSocket = configureSocket;
