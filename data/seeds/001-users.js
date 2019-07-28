const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("users").then(function() {
		// Inserts seed entries
		return knex("users").insert([
			{
				username: "example1",
				password: bcrypt.hashSync("pass", 10),
				full_name: "Chad"
			},
			{
				username: "example2",
				password: bcrypt.hashSync("pass", 10),
				full_name: "Carol"
			}
		]);
	});
};
