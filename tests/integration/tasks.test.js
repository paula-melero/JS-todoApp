const request = require("supertest"); //function used to make HTTP requests

describe("api/tasks", () => {
  let server;

  beforeEach(() => {
    server = require("../../server");
  });

  afterEach(() => {
    server.close();
  });

  // describe('GET /', () =>{

  // });
});
