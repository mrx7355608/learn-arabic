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

    describe("Protected routes", () => {
        it("prevents un-authorized users from accessing a protected route", async () => {
            await agent.get("/api/v1/user/").expect(401, {
                error: "Un-authorized",
            });
        });
    });
    describe("Register endpoint", () => {
        const registerEndpoint = "/api/v1/auth/register";
        const invalidCredentials = {
            fname: "John",
            lname: "Wick",
            email: "wickiii@yahoo.com",
            password: "some_password_123",
            confirmPassword: "some_non_matching_password123",
        };

        // Validation test
        it("responds with an validation error when invalid data is given", async () => {
            await agent
                .post(registerEndpoint)
                .send(invalidCredentials)
                .expect(400, {
                    error: "Passwords do not match",
                });
        });

        // User already exists
        it("returns 400 when registered email is provided", async () => {
            const response = await agent
                .post(registerEndpoint)
                .send({
                    ...invalidCredentials,
                    email: config.TEST_USER_EMAIL,
                    password: "1234567890",
                    confirmPassword: "1234567890",
                })
                .expect(400, {
                    error: "This email is already registered",
                });
        });
    });
    describe("Login endpoint", () => {
        const url = "/api/v1/auth/login";

        // valid/registered credentials
        it("responds with 200 and a cookie on a successfull login", async () => {
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
                login: true,
            });
        });

        // non-registered credentials
        it("responds with bad error when an non-registered email is given", async () => {
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
    describe("Guest routes", () => {
        it("prevents logged in users from accessing a guest route e.g: /login /register", async () => {
            await agent
                .post("/api/v1/auth/login")
                .send({
                    email: config.TEST_USER_EMAIL,
                    password: config.TEST_USER_PASSWORD,
                })
                .expect(400, {
                    error: "Not allowed",
                });
        });
    });
    describe("Email verification", () => {
        // Invalid token
        it("returns 400 when invalid email-verification token is passed", async () => {
            const url = "/api/v1/auth/verify-email?token=invalid_token123.3123";
            const response = await agent.get(url).expect(400);
            expect(response.body).toEqual({
                error: expect.any(String),
            });
        });

        // Expired token
        it("returns error when an expired email-verification token is provided", async () => {
            const url =
                "/api/v1/auth/verify-email?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzOWRkZDhhOWNiNDdiZWQ2Y2YzN2YzOCIsImlhdCI6MTY3MTM3Njc4OCwiZXhwIjoxNjcxMzc3MDg4fQ.G_2W3A7MdPzm19mXe5M-SmwVQ_EqwZqqWsJVTH4Ln3M";
            const response = await agent.get(url).expect(400);
            expect(response.body).toEqual({
                error: "Token has expired, request again",
            });
        });
    });
});
