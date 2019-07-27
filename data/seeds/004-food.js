exports.seed = function(knex) {
	// Deletes ALL existing entries
	return knex("food")
		.truncate()
		.then(function() {
			// Inserts seed entries
			return knex("food").insert([
				{
					event_id: 1,
					recipe_name: "Pizza",
					guest_id: null
				},
				{
					event_id: 1,
					recipe_name: "Beer",
					guest_id: 1
				},
				{
					event_id: 2,
					recipe_name: "Amway",
					guest_id: 2
				}
			]);
		});
};
