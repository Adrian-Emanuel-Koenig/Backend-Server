"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../../model/products");
const memory_1 = __importDefault(require("../container/memory"));
const mongoDb_1 = __importDefault(require("../container/mongoDb"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let ProductsDAO;
const mode = process.env.DB;
if (mode === "mongo") {
    console.log("DB: mongo");
    class ProdDaosModel extends mongoDb_1.default {
        constructor() {
            super(products_1.productModel);
        }
    }
    ProductsDAO = new ProdDaosModel();
}
else if (mode === "memory") {
    console.log("DB: memory");
    class ProdDaosModel extends memory_1.default {
        constructor() {
            super();
        }
    }
    ProductsDAO = new ProdDaosModel();
}
else {
    throw new Error("No database selected");
}
exports.default = ProductsDAO;
