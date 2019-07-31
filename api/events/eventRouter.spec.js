const request = require("supertest");
const db = require("../../data/db-config");
const server = require("../server");

describe("routes", () => {
	let token;

	// beforeAll(async () => {
	// 	await db("users")
	// 		.truncate()
	// 		.then(function() {
	// 			return db("events")
	// 				.truncate()
	// 				.then(function() {
	// 					return db("guests")
	// 						.truncate()
	// 						.then(function() {
	// 							return db("recipes").truncate();
	// 						});
	// 				});
	// 		});
	// });

	describe("setup", () => {
		it("register", () => {
			const user = {
				username: "user1",
				password: "pass1",
				full_name: "full_name",
				email: "email"
			};

			return request(server)
				.post(`/users/register`)
				.send(user);
		});

		it("login", () => {
			const userLog = {
				username: "user1",
				password: "pass1"
			};

			return request(server)
				.post(`/users/login`)
				.send(userLog)
				.then(res => {
					token = res.body.token;
				});
		});

		it("create first event", () => {
			const event = {
				event_name: "Newer Event",
				date: "2019-03-31",
				time: "12:00:00",
				description: "test2",
				address: "1234 street",
				city: "test2",
				state: "test2"
			};

			return request(server)
				.post(`/users/2/events`)
				.set("authorization", token)
				.send(event);
		});
	});

	describe("get", () => {
		it("should return 200 for retrieving all events", () => {
			return request(server)
				.get(`/events/`)
				.set("authorization", token)
				.then(res => {
					expect(res.status).toBe(200);
				});
		});
	});
});
