"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cart_1 = require("../../model/cart");
const memory_1 = __importDefault(require("../container/memory"));
const mongoDb_1 = __importDefault(require("../container/mongoDb"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let CartDAO;
const mode = process.env.DB;
if (mode == "mongo") {
    class UserDaosModel extends mongoDb_1.default {
        constructor() {
            super(cart_1.cartModel);
        }
    }
    CartDAO = new UserDaosModel();
}
else if (mode == "memory") {
    class UserDaosModel extends memory_1.default {
        constructor() {
            super();
        }
    }
    CartDAO = new UserDaosModel();
}
else {
    throw new Error("No database Selected");
}
exports.default = CartDAO;
