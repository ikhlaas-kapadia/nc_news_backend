process.env.NODE_ENV = "test";

const app = require("../app");
const { expect } = require("chai");
const request = require("supertest");
const connection = require("../db/connection");

describe("/api", () => {
  //after: destroy connection to DB
  after(() => {
    return connection.destroy();
  });
  //before each: reseed database
  beforeEach(() => {
    return connection.seed.run();
  });
  describe("/topics", () => {
    it("responds with an array of topic objects", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(res => {
          res.body.topics.forEach(res => {
            expect(res).to.have.all.keys(["slug", "description"]);
          });
          expect(res.body.topics.length).to.equal(3);
        });
    });
    it("GET: 404 responds with route not found when specified invalid route", () => {
      return request(app)
        .get("/api/chickenwings")
        .expect(404)
        .then(res => {
          console.log(res.body, "from test file");
          expect(res.body.msg).to.equal("Invalid Path");
        });
    });
  });
  describe.only("/users", () => {
    describe("/users:username", () => {
      it("responds with an array of specified username details with a key username", () => {
        return request(app)
          .get("/api/users/butter_bridge")
          .expect(200)
          .then(res => {
            expect(res.body.user).to.have.all.keys([
              "username",
              "avatar_url",
              "name"
            ]);
            expect(res.body.user).to.be.an("object");
          });
      });
      it("GET - 404 Reponds with Invalid username when username does not exist ", () => {
        return request(app)
          .get("/api/users/1")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("Invalid Username");
          });
      });
    });
  });
});
