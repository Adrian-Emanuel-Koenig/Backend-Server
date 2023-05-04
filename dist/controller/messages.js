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
exports.readAllController = exports.readOneController = exports.createController = void 0;
const messages_1 = require("../service/messages");
const winston_1 = __importDefault(require("../utils/logger/winston"));
const createController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, messages_1.createService)(req.body);
        res.status(201).json({
            status: true,
            message: "Product successfully saved",
        });
    }
    catch (error) {
        winston_1.default.error(error, `${error}`);
    }
});
exports.createController = createController;
const readOneController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.params;
        const message = yield (0, messages_1.readOneService)(username);
        res.json(message);
    }
    catch (error) {
        winston_1.default.error(error, `${error}`);
    }
});
exports.readOneController = readOneController;
const readAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const message = yield (0, messages_1.readAllService)();
        res.json(message);
    }
    catch (error) {
        winston_1.default.error(error, `${error}`);
    }
});
exports.readAllController = readAllController;
