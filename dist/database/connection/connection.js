"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionMDB = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const mongoose_1 = __importDefault(require("mongoose"));
const winston_1 = __importDefault(require("../../utils/logger/winston"));
const connect = mongoose_1.default.connect;
mongoose_1.default.set("strictQuery", true);
function connection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connect(process.env.MONGO_URI, {
                useNewUrlParser: true,
            });
            winston_1.default.info("Connected to MongoDB Atlas");
        }
        catch (error) {
            winston_1.default.error(error);
            throw new Error("Can not connect to the database");
        }
    });
}
exports.connectionMDB = connection();
