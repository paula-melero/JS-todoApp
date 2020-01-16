const app = require("../../server");
const supertest = require("supertest");
const request = supertest(app);
const { User } = require("../../models/users");
const { Task } = require("../../models/tasks");

describe("auth middleware", () => {
  let server;
  let token;
  let pagination;

  beforeEach(() => {
    server = require("../../server");

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
    await Task.deleteMany({});
  });

  const exec = () => {
    let { pageNumber, pageSize } = pagination;

    return request
      .get("api/tasks/")
      .set("x-auth-token", token)
      .query({ pageNumber, pageSize });
  };

  it("should return a 401 if no token is provided", async done => {
    token = "";
    //populate the test database
    Task.collection.insertMany([
      {
        title: "Test todo task",
        description: "First task populated from test file"
      },
      {
        title: "Test todo task 2",
        description: "Second task populated from test file"
      },
      {
        title: "Test todo task 3",
        description: "Third task populated from test file"
      },
      {
        title: "Test todo task 4",
        description: "Fourth task populated from test file"
      }
    ]);
    const res = await exec();

    expect(res.status).toBe(401);
    done();
  });

  it("should return a 400 if token is invalid", async done => {
    token = "123";

    const res = await exec();
    expect(res.status).toBe(400);
    done();
  });

  it("should return a 200 if token is valid", async done => {
    const res = await exec();

    expect(res.status).toBe(200);
    done();
  });
});
