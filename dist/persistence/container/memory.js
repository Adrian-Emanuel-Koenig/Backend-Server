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
class MemoryCrud {
    constructor() {
        this.data = [];
    }
    create(object) {
        return new Promise((resolve, reject) => {
            this.data.push(object);
            console.log(object);
            resolve();
        });
    }
    readAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objects = this.data;
                return objects;
            }
            catch (error) {
                throw new Error(`Error reading objects: ${error}`);
            }
        });
    }
    read(id) {
        const object = this.data.find((obj) => obj.id == id);
        if (!object) {
            console.log("Product not found");
        }
        return object;
    }
    update(id, newObject) {
        return new Promise((resolve, reject) => {
            const index = this.data.findIndex((obj) => obj.id === id);
            if (index === -1)
                reject(new Error("Object not found"));
            this.data.splice(index, 1, newObject);
            resolve();
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            const index = this.data.findIndex((obj) => obj.id === id);
            if (index === -1)
                reject(new Error("Object not found"));
            this.data.splice(index, 1);
            resolve();
        });
    }
}
exports.default = MemoryCrud;
