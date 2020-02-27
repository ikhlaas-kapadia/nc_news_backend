process.env.NODE_ENV = "test";

const app = require("../app");
const { expect } = require("chai");
const request = require("supertest");
const connection = require("../db/connection");
const chai = require("chai");
chai.use(require("sams-chai-sorted"));

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
    it("GET - 200,responds with an array of topic objects", () => {
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
    it("GET - 404 responds with route not found when specified invalid route", () => {
      return request(app)
        .get("/api/chickenwings")
        .expect(404)
        .then(res => {
          expect(res.body.msg).to.equal("Invalid Path");
        });
    });
  });
  describe("/users", () => {
    describe("/users:username", () => {
      it("GET - 200, responds with an array of specified username details with a key username", () => {
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
  describe("/articles", () => {
    describe("/:article_id", () => {
      it("GET - 200, responds with an article object", () => {
        return request(app)
          .get("/api/articles/1")
          .expect(200)
          .then(res => {
            expect(res.body.article).to.have.all.keys([
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at",
              "comment_count"
            ]);
          });
      });

      it("GET - 404, responds with Article ID does not exist", () => {
        return request(app)
          .get("/api/articles/999")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("Article ID does not exist");
          });
      });
      it("GET - 400, responds with invalid data type", () => {
        return request(app)
          .get("/api/articles/jsjsjs")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal("Invalid Input");
          });
      });
      it("PATCH - 200, responds with updated article when passed request object with votes", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(res => {
            expect(res.body.article).to.have.all.keys([
              "article_id",
              "title",
              "body",
              "votes",
              "topic",
              "author",
              "created_at"
            ]);
          });
      });
      it("PATCH - 404, responds with Article ID does not exist to update", () => {
        return request(app)
          .patch("/api/articles/999")
          .send({ inc_votes: 1 })
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("Article ID does not exist");
          });
      });
      it("PATCH - 400, responds with Invalid Input when user Id is a string", () => {
        return request(app)
          .patch("/api/articles/dhdhdh")
          .send({ inc_votes: 1 })
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal("Invalid Input");
          });
      });
      it("PATCH - 400, responds with Invalid request format when request is empty", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({})
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal("Invalid request format");
          });
      });
      it("PATCH - 400, responds with Invalid Input, when request object is not a number", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: "cats" })
          .expect(400)
          .then(res => {
            //ask tutors as directing through same psql error
            expect(res.body.msg).to.equal("Invalid Input");
          });
      });
      it("PATCH - 400, responds with Invalid Input, when request object has extra keys", () => {
        return request(app)
          .patch("/api/articles/1")
          .send({ inc_votes: "cats", name: "mitch" })
          .expect(400)
          .then(res => {
            //ask tutors as directing through same psql error
            expect(res.body.msg).to.equal("Invalid Input");
          });
      });
      describe("/:article_id/comments", () => {
        it("POST - 201, responds with posted comment", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({ username: "butter_bridge", body: "test comment" })
            .expect(201)
            .then(res => {
              //ask tutors as directing through same psql error
              expect(res.body.comment.body).to.equal("test comment");
            });
        });
        it("POST - 404, responds with Invalid article ID when endpoint has invalid article id", () => {
          return request(app)
            .post("/api/articles/9999/comments")
            .send({ username: "butter_bridge", body: "test comment" })
            .expect(404)
            .then(res => {
              //ask tutors as directing through same psql error
              expect(res.body.msg).to.equal("ID not found");
            });
        });
        it("POST - 400, responds with Invalid input when request object to post in empty", () => {
          return request(app)
            .post("/api/articles/1/comments")
            .send({})
            .expect(400)
            .then(res => {
              //ask tutors as directing through same psql error
              expect(res.body.msg).to.equal("Invalid Input");
            });
        });
        it("GET - 200, responds with an array of comments by article_id", () => {
          return request(app)
            .get("/api/articles/1/comments")
            .expect(200)
            .then(res => {
              res.body.comments.forEach(comment => {
                expect(comment).to.have.all.keys([
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                ]);
              });
              expect(res.body.comments).to.be.an("array");
              expect(res.body.comments).to.be.sortedBy("created_at", {
                descending: true
              });
            });
        });
        it("GET - 404, responds with ID not found when ID does not exist", () => {
          return request(app)
            .get("/api/articles/999/comments")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("ID not found");
            });
        });
        it("GET - 400, responds Invalid Input when id is a string", () => {
          return request(app)
            .get("/api/articles/hello/comments")
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.equal("Invalid Input");
            });
        });
      });
      describe("/comments?sort_by=column", () => {
        it("GET-200, responds with comments sorted in descending order by default when order not specified", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=created_at")
            .expect(200)
            .then(res => {
              res.body.comments.forEach(comment => {
                expect(comment).to.have.all.keys([
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                ]);
              });
              expect(res.body.comments).to.be.sortedBy("created_at", {
                descending: true
              });
            });
        });
        it("GET-200, responds with comments sorted by column created_at by default when sortBy not specified", () => {
          return request(app)
            .get("/api/articles/1/comments?order=asc")
            .expect(200)
            .then(res => {
              res.body.comments.forEach(comment => {
                expect(comment).to.have.all.keys([
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                ]);
              });
              expect(res.body.comments).to.be.sortedBy("created_at", {
                descending: false
              });
            });
        });
        it("GET-200, responds with comments sorted by column votes in descending order when order not specified", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=votes")
            .expect(200)
            .then(res => {
              res.body.comments.forEach(comment => {
                expect(comment).to.have.all.keys([
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                ]);
              });
              expect(res.body.comments).to.be.sortedBy("votes", {
                descending: true
              });
            });
        });
        it("GET-200, responds with comments sorted by column votes and in ascending order when specified multiple queries", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=votes&&order=asc")
            .expect(200)
            .then(res => {
              res.body.comments.forEach(comment => {
                expect(comment).to.have.all.keys([
                  "comment_id",
                  "votes",
                  "created_at",
                  "author",
                  "body"
                ]);
              });
              expect(res.body.comments).to.be.sortedBy("votes", {
                descending: false
              });
            });
        });
        it("GET-400, responds with Invalid query when query string is not a valid column", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=points&&order=asc")
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.be.equal("Invalid query");
            });
        });
        it("GET-400, responds with Invalid order query when query string is not a valid order type", () => {
          return request(app)
            .get("/api/articles/1/comments?sort_by=votes&&order=banana")
            .expect(400)
            .then(res => {
              expect(res.body.msg).to.be.equal("Invalid order query");
            });
        });
        it("GET-404, responds with ID not found  when querying an invalid ID", () => {
          return request(app)
            .get("/api/articles/999/comments?sort_by=created_at&&order=desc")
            .expect(404)
            .then(res => {
              expect(res.body.msg).to.equal("ID not found");
            });
        });
        it("GET-200, responds with empty array when article id exists but has no comments", () => {
          return request(app)
            .get("/api/articles/2/comments")
            .expect(200)
            .then(res => {
              expect(res.body.comments).to.be.an("array");
              expect(res.body.comments.length).to.equal(0);
            });
        });
      });
    });
    describe("/", () => {
      it("GET - 200,responds with an array of articles in articles object", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(res => {
            res.body.articles.forEach(res => {
              expect(res).to.have.all.keys([
                "author",
                "title",
                "article_id",
                "topic",
                "created_at",
                "votes",
                "comment_count"
              ]);
            });
          });
      });
      it("GET - GET - 200,responds with an array of articles sorted by created_at column in desc order by default", () => {
        return request(app)
          .get("/api/articles")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.sortedBy("created_at", {
              descending: true
            });
          });
      });
      it("GET - GET - 200,responds with an array of articles in an object sorted by specified column and order", () => {
        return request(app)
          .get("/api/articles?sort_by=votes&&order=asc")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.sortedBy("votes", {
              descending: false
            });
          });
      });
      it("GET-400, responds with Invalid query when query sortis not a valid column", () => {
        return request(app)
          .get("/api/articles?sort_by=points")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.be.equal("Invalid query");
          });
      });
      it("GET-400, responds with Invalid order query when query order is not a valid order type", () => {
        return request(app)
          .get("/api/articles?order=banana")
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.be.equal("Invalid order query");
          });
      });
      it("GET - 200,responds with an array of articles in an object sorted by author", () => {
        return request(app)
          .get("/api/articles?author=butter_bridge")
          .expect(200)
          .then(res => {
            expect(res.body.articles).to.be.sortedBy("created_at", {
              descending: true
            });
            res.body.articles.forEach(article => {
              expect(article.author).to.equal("butter_bridge");
            });
          });
      });
      it("GET - 200,responds with an array of articles in an object sorted by topic", () => {
        return request(app)
          .get("/api/articles?topic=mitch")
          .expect(200)
          .then(res => {
            res.body.articles.forEach(article => {
              expect(article.topic).to.equal("mitch");
            });
          });
      });
      it("GET - 404,responds with topic does not exist if no article with specified topic", () => {
        return request(app)
          .get("/api/articles?topic=hello")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("topic does not exist");
          });
      });
      it("GET - 404,responds with author does not exist if no article with specified author", () => {
        return request(app)
          .get("/api/articles?author=hello")
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("author does not exist");
          });
      });
    });
  });
  describe("/comments", () => {
    describe("/:comment_id", () => {
      it("PATCH-200,responds with updated comment when passed request object with votes ", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: 1 })
          .expect(200)
          .then(res => {
            console.log(res.body.comment);
            expect(res.body.comment).to.have.all.keys([
              "comment_id",
              "author",
              "article_id",
              "votes",
              "body",
              "created_at"
            ]);
          });
      });
      it("PATCH - 404, responds with comment ID does not exist to update", () => {
        return request(app)
          .patch("/api/comments/999")
          .send({ inc_votes: 1 })
          .expect(404)
          .then(res => {
            expect(res.body.msg).to.equal("Comment ID does not exist");
          });
      });
      it("PATCH - 400, responds with Invalid Input when comment id is a string", () => {
        return request(app)
          .patch("/api/comments/dhdhdh")
          .send({ inc_votes: 1 })
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal("Invalid Input");
          });
      });
      it("PATCH - 400, responds with Invalid request format when request is empty", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({})
          .expect(400)
          .then(res => {
            expect(res.body.msg).to.equal("Invalid request format");
          });
      });
      it("PATCH - 400, responds with Invalid Input, when request object is not a number", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: "cats" })
          .expect(400)
          .then(res => {
            //ask tutors as directing through same psql error
            expect(res.body.msg).to.equal("Invalid Input");
          });
      });
      it("PATCH - 400, responds with Invalid Input, when request object has extra keys", () => {
        return request(app)
          .patch("/api/comments/1")
          .send({ inc_votes: "cats", name: "mitch" })
          .expect(400)
          .then(res => {
            //ask tutors as directing through same psql error
            expect(res.body.msg).to.equal("Invalid Input");
          });
      });
      it("DEL- 204, responds with no content when deleting comment", () => {
        return request(app)
          .delete("/api/comments/1")
          .expect(204);
      });
      it("DEL- 404, responds with 404 when Id does not exist", () => {
        return request(app)
          .delete("/api/comments/999")
          .expect(404);
      });
      it("DEL- 400, responds with 400 invalid id type", () => {
        return request(app)
          .delete("/api/comments/hhsh")
          .expect(400);
      });
    });
  });
});
