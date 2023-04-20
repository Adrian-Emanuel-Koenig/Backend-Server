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
exports.deleteService = exports.updateService = exports.readAllService = exports.readOneService = exports.createService = void 0;
const products_1 = __importDefault(require("../persistence/dao/products"));
const winston_1 = __importDefault(require("../utils/logger/winston"));
const createService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (data &&
            data.nombre &&
            data.precio &&
            data.stock &&
            data.img &&
            data.categoria) {
            yield products_1.default.create(data);
        }
    }
    catch (error) {
        winston_1.default.error(error);
        throw error;
    }
});
exports.createService = createService;
const readOneService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield products_1.default.read(data);
    }
    catch (error) {
        winston_1.default.error(error);
    }
});
exports.readOneService = readOneService;
const readAllService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield products_1.default.readAll();
        return products;
    }
    catch (error) {
        winston_1.default.error(error);
        throw error;
    }
});
exports.readAllService = readAllService;
const updateService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield products_1.default.update(id, data);
    }
    catch (error) {
        winston_1.default.error(error);
    }
});
exports.updateService = updateService;
const deleteService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield products_1.default.delete(id);
    }
    catch (error) {
        winston_1.default.error(error);
        throw error;
    }
});
exports.deleteService = deleteService;
