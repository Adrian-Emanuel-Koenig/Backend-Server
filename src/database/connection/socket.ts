import { Server as SocketServer } from "socket.io";

export const configureSocket = (server: any) => {
  const io = new SocketServer(server, { cors: {} });

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
