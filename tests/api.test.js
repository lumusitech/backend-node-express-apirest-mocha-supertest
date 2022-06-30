const { application } = require("express");
const request = require("supertest");
const { set } = require("../src/app");

const app = require("../src/app");

/**
 * Testing get all users endpoint
 */
describe("GET /users", () => {
  it("respond with json containing a list of all users", (done) => {
    request(app)
      .get("/users")
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(200, done);
  });
});

describe("GET /users:id", () => {
  it("respond with json containing a single user with id given", (done) => {
    request(app)
      .get("/users/user0001")
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(200, done);
  });

  it("respond with json ok message when the user exists", (done) => {
    request(app)
      .get("/users/user0001")
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(200)
      .expect({
        ok: true,
        msg: `user with id user0001`,
      })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("respond with json error message when the user does not exists", (done) => {
    request(app)
      .get("/users/none-existing-user")
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(404)
      .expect({ ok: false, msg: `user with id none-existing-user not found` })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});

describe("POST /users", () => {
  it("respond with 201 created", (done) => {
    const data = { username: "karlux", password: "1234" };
    request(app)
      .post("/users")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });

  it("respond with 401 on bad request", (done) => {
    const data = {};
    request(app)
      .post("/users")
      .send(data)
      .set("Accept", "application/json")
      .expect("Content-type", /json/)
      .expect(400)
      .expect({ ok: false, msg: "username and password are required" })
      .end((err) => {
        if (err) return done(err);
        done();
      });
  });
});
