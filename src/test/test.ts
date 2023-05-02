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
    it("deberia responder con status 200 y ser array", async () => {
      const res = await request.get("/api/productos");
      expect(res.status).to.eql(200);
      expect(res.body).to.be.a("object");
    });
  });
});

describe("POST ONE", () => {
  it("deberia incorporar un posteo", async () => {
    const post = generatePost();
    const res = await request.post("/api/productos").send(post);
    expect(res.status).to.eql(201);
    expect(res.body).to.be.a("object");
    expect(res.body).to.include.keys("status", "message");
  });
});

describe("PUT ONE", () => {
  it("deberia actualizar un posteo", async () => {
    const post = generatePost();
    const res = await request.post("/api/productos").send(post);
    const postId = res.body.id;
    console.log(postId)
    const updatedPost = {
      title: faker.internet.userName(),
      body: faker.lorem.paragraph(),
    };
    const updatedRes = await request
      .put(`/api/productos/${postId}`)
      .send(updatedPost);
    expect(updatedRes.status).to.eql(200);
    expect(updatedRes.body).to.be.a("object");
    expect(updatedRes.body).to.have.all.keys(Object.keys(updatedPost).concat('id'));
    expect(updatedRes.body.post.body).to.eql(updatedPost.body);
    
  });
});

// describe("DELETE ONE", () => {
//     it("deberia eliminar un posteo", function (done) {
//         this.timeout(5000);
//         const post = generatePost();
//         request.post("/api/productos").send(post).then((res) => {
//           const postId = res.body.id;
//           request.delete(`/api/productos/${postId}`).then((deleteRes) => {
//             expect(deleteRes.status).to.eql(200);
//             expect(deleteRes.body).to.be.a("object");
//             expect(deleteRes.body).to.include.keys("status", "message");
//             done();
//           }).catch(done);
//         }).catch(done);
//       });
      
// });

