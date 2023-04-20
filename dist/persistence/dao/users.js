"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../model/users");
const memory_1 = __importDefault(require("../container/memory"));
const mongoDb_1 = __importDefault(require("../container/mongoDb"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let UsersDAO;
const mode = process.env.DB;
if (mode == "mongo") {
    console.log("DB: mongo");
    class UserDaosModel extends mongoDb_1.default {
        constructor() {
            super(users_1.userModel);
        }
    }
    UsersDAO = new UserDaosModel();
}
else if (mode == "memory") {
    console.log("DB: memory");
    class UserDaosModel extends memory_1.default {
        constructor() {
            super();
        }
    }
    UsersDAO = new UserDaosModel();
}
else {
    throw new Error("No database Selected");
}
exports.default = UsersDAO;
