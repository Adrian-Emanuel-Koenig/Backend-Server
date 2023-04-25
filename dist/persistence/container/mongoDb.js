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
Object.defineProperty(exports, "__esModule", { value: true });
class MongoCrud {
    constructor(model) {
        this.model = model;
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.model.create(data);
                console.log(item);
                return item;
            }
            catch (error) {
                throw new Error(`Error creating item: ${error}`);
            }
        });
    }
    read(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.model.findOne({ username });
            if (!item) {
                console.log(item);
                return null;
            }
            return item;
        });
    }
    chat(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const item = yield this.model.find({ username });
            if (!item) {
                console.log(item);
                return null;
            }
            return item;
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield this.model.find({});
            return items;
        });
    }
    update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.model.findByIdAndUpdate(id, data, { new: true });
                if (!item) {
                    throw new Error(`Item not found`);
                }
                return item;
            }
            catch (error) {
                throw new Error(`Error updating item: ${error}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const item = yield this.model.findByIdAndDelete(id);
                if (!item) {
                    throw new Error(`Item not found`);
                }
                return item;
            }
            catch (error) {
                throw new Error(`Error deleting item: ${error}`);
            }
        });
    }
}
exports.default = MongoCrud;
