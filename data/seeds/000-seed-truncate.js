exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("recipes")
		.truncate()
		.then(function() {
			return knex("guests").truncate();
		})
		.then(function() {
			return knex("events").truncate();
		})
		.then(function() {
			return knex("users").truncate();
		});
};
