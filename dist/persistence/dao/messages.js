"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../model/messages");
const memory_1 = __importDefault(require("../container/memory"));
const mongoDb_1 = __importDefault(require("../container/mongoDb"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let MessagesDAO;
const mode = process.env.DB;
if (mode == "mongo") {
    console.log("DB: mongo");
    class UserDaosModel extends mongoDb_1.default {
        constructor() {
            super(messages_1.messageModel);
        }
    }
    MessagesDAO = new UserDaosModel();
}
else if (mode == "memory") {
    console.log("DB: memory");
    class UserDaosModel extends memory_1.default {
        constructor() {
            super();
        }
    }
    MessagesDAO = new UserDaosModel();
}
else {
    throw new Error("No database Selected");
}
exports.default = MessagesDAO;
