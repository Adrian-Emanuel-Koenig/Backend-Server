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
const request = require("supertest")("http://localhost:8080");
const expect = require("chai").expect;
const faker = require("@faker-js/faker").faker;
const generatePost = () => {
    return {
        title: faker.internet.userName(),
        body: faker.lorem.paragraph(),
    };
};
describe("test posts endpoint", () => {
    describe("GET ALL", () => {
        it("deberia responder con status 200 y ser array", () => __awaiter(void 0, void 0, void 0, function* () {
            const res = yield request.get("/api/productos");
            expect(res.status).to.eql(200);
            expect(res.body).to.be.a("object");
        }));
    });
});
describe("POST ONE", () => {
    it("deberia incorporar un posteo", () => __awaiter(void 0, void 0, void 0, function* () {
        const post = generatePost();
        const res = yield request.post("/api/productos").send(post);
        expect(res.status).to.eql(201);
        expect(res.body).to.be.a("object");
        expect(res.body).to.include.keys("status", "message");
    }));
});
describe("PUT ONE", () => {
    it("deberia actualizar un posteo", () => __awaiter(void 0, void 0, void 0, function* () {
        const post = generatePost();
        const res = yield request.post("/api/productos").send(post);
        const postId = res.body.id;
        console.log(postId);
        const updatedPost = {
            title: faker.internet.userName(),
            body: faker.lorem.paragraph(),
        };
        const updatedRes = yield request
            .put(`/api/productos/${postId}`)
            .send(updatedPost);
        expect(updatedRes.status).to.eql(200);
        expect(updatedRes.body).to.be.a("object");
        expect(updatedRes.body).to.have.all.keys(Object.keys(updatedPost).concat('id'));
        expect(updatedRes.body.post.body).to.eql(updatedPost.body);
    }));
});
