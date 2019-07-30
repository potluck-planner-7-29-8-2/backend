const request = require("supertest");
const db = require("../../data/db-config");
const server = require("../server");

describe("routes", () => {
	afterAll(async () => {
		await db("users").truncate();
	});

	describe("register", () => {
		it("should return 201 for adding user", () => {
			const user = {
				username: "user",
				password: "pass",
				full_name: "full_name",
				email: "email"
			};

			return request(server)
				.post(`/users/register`)
				.send(user)
				.then(res => {
					expect(res.status).toBe(201);
				});
		});
	});

	describe("login", () => {
		it("should return 200 for logging in", async () => {
			const userLog = {
				username: "user",
				password: "pass"
			};

			return request(server)
				.post(`/users/login`)
				.send(userLog)
				.then(res => {
					expect(res.status).toBe(200);
				});
		});
	});
});
