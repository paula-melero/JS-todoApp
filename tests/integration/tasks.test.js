require("dotenv").config();
const app = require("../../server"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const { Task } = require("../../models/tasks");
const { User } = require("../../models/users");

describe("api/tasks", () => {
  let server;
  let token;
  let pagination;

  beforeEach(() => {
    token = new User({
      username: "username",
      password: "password"
    }).generateAuthToken();
    pagination = {
      pageNumber: 1,
      pageSize: 4
    };
  });

  afterEach(async () => {
    //clean up the test database
    await Task.deleteMany({});
  });

  describe("GET /", () => {
    it("should return 401 for a non auth user", async done => {
      token = "";

      const res = await request
        .get("api/tasks/")
        .set("x-auth-token", token)
        .send(pagination);
      // expect(req.query.pageNumber).toBe(1);
      // expect(req.query.pageSize).toBe(4);

      expect(res.status).toBe(401);
      done();
    });
  });
});
