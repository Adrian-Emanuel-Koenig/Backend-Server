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
exports.deleteController = exports.updateController = exports.readAllController = exports.readOneController = exports.createController = void 0;
const products_1 = require("../service/products");
const winston_1 = __importDefault(require("../utils/logger/winston"));
const createController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, products_1.createService)(req.body);
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
        const product = yield (0, products_1.readOneService)(req.body);
        res.json({
            status: true,
            data: product,
        });
    }
    catch (error) {
        winston_1.default.error(error, `${error}`);
    }
});
exports.readOneController = readOneController;
const readAllController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, products_1.readAllService)();
        res.json({
            status: true,
            data: products,
        });
    }
    catch (error) {
        winston_1.default.error(error, `${error}`);
    }
});
exports.readAllController = readAllController;
const updateController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, products_1.updateService)(req.params.id, req.body);
        res.json({
            status: true,
            message: "Product successfully updated",
        });
    }
    catch (error) {
        winston_1.default.error(error, `${error}`);
    }
});
exports.updateController = updateController;
const deleteController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, products_1.deleteService)(req.params.id);
        res.json({
            status: true,
            message: "Product successfully deleted",
        });
    }
    catch (error) {
        winston_1.default.error(error, `${error}`);
    }
});
exports.deleteController = deleteController;
