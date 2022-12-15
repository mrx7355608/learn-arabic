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

        // valid/registered credentials
        it("responds with 200 and a cookie when provided correct credentials", async () => {
            const response = await agent
                .post(url)
                .send({
                    email: config.TEST_USER_EMAIL,
                    password: config.TEST_USER_PASSWORD,
                })
                .expect(200);

            const cookies = response.headers["set-cookie"][0];
            expect(cookies instanceof String);
            expect(response.body).toStrictEqual({
                ok: true,
            });
        });

        // non-registered credentials
        it("responds with bad error when an un-registered email is given", async () => {
            const response = await agent
                .post(url)
                .send({
                    email: "some_email@gmail.com",
                    password: "some_password123",
                })
                .expect(400);
            expect(response.body).toEqual({
                error: expect.any(String),
            });
        });

        // validation tests
        it("responds with bad error when invalid data is given", async () => {
            const response = await agent
                .post(url)
                .send({
                    email: null,
                    password: config.TEST_USER_PASSWORD,
                })
                .expect(400);
            expect(response.body).toEqual({
                error: expect.any(String),
            });
        });
        // TODO: prevent un-verified emails from logging in
    });
    describe("Register endpoint", () => {});
});
