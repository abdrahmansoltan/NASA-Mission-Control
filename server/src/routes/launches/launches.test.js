const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launcjes API", () => {
  // connect ot mongoDB at the beginning before anything
  beforeAll(async () => {
    await mongoConnect();
  });
  afterAll(async () => {
    await mongoDisconnect();
  });
  
  describe("Test GET /launches", () => {
    test("It should respond with 200 seccess", async () => {
      const response = await request(app)
        .get("/launches")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launches", () => {
    // Data for testing
    const completeLaunchData = {
      mission: "ESS Enterprise",
      rocket: "NNC 1701-D",
      target: "Kepler-1410 b",
      launchDate: "January 2,2025",
    };
    const launchDateWithoutDate = {
      mission: "ESS Enterprise",
      rocket: "NNC 1701-D",
      target: "Kepler-1410 b",
    };
    const launchDateWithInvalidDate = {
      mission: "ESS Enterprise",
      rocket: "NNC 1701-D",
      target: "Kepler-1410 b",
      launchDate: "dummy",
    };

    // Tests
    test("It should respond with 201 created", async () => {
      const response = await request(app)
        .post("/launches")
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestedDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestedDate);

      // Match objects partially
      expect(response.body).toMatchObject(launchDateWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDateWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      // Match objects fully
      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });

    test("It should catch invalid dates", async () => {
      const response = await request(app)
        .post("/launches")
        .send(launchDateWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      // Match objects fully
      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
