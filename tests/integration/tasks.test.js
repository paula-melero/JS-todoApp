const request = require("supertest"); //function used to make HTTP requests
const { Task } = require("../../models/tasks");

describe("api/tasks", async () => {
  let server;

  beforeEach(() => {
    server = require("../../server");
  });

  afterEach(async () => {
    server.close();
    //clean up the test database
    await Task.remove({});
  });

  describe("GET /", () => {
    //   it("should return all tasks for a given user", async () => {
    //     //populate the test database
    //     Task.collection.insertMany([
    //       {
    //         title: "Test todo task",
    //         description: "First task populated from test file"
    //       },
    //       {
    //         title: "Test todo task 2",
    //         description: "Second task populated from test file"
    //       },
    //       {
    //         title: "Test todo task 3",
    //         description: "Third task populated from test file"
    //       },
    //       {
    //         title: "Test todo task 4",
    //         description: "Fourth task populated from test file"
    //       }
    //     ]);
    //     const res = await request(server).get("api/tasks");
    //     expect(res.status).toBe(200);
    //     expect(res.body.length).toBe(4);
    //   });
  });
});
