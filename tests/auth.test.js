require("dotenv/config");
const mongoose = require("mongoose");
const config = require("@config/index");
const supertest = require("supertest");
const app = require("../src/app");

let agent = supertest.agent(app);

describe("Authentication tests", () => {
    beforeAll(() => {
        mongoose.set("strictQuery", false);
        mongoose.connect(config.DB_URL);
    });
    afterAll(() => mongoose.disconnect());

    describe("Login endpoint", () => {
        const url = "/api/v1/auth/login";
        // non-registered credentials
        // valid/registered credentials
        // validation tests
        it("responds with bad error when invalid data is given", async () => {
            const response = await agent
                .post(url)
                .send({
                    email: config.TEST_USER_EMAIL,
                    password: config.TEST_USER_PASSWORD,
                })
                .expect(400);
            expect(response.body).toEqual({
                error: jest.any(String),
            });
        });
        // TODO: prevent un-verified emails from logging in
    });
    describe("Register endpoint", () => {});
});
