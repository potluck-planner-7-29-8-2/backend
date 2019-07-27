exports.up = function(knex) {
	return knex.schema
		.createTable("users", users => {
			users.increments("user-id");
			users
				.string("username")
				.notNullable()
				.unique();
			users.string("password").notNullable();
			users.string("full-name").notNullable();
		})
		.createTable("events", events => {
			events.increments("event-id");
			events
				.integer("organizer-id")
				.unsigned()
				.notNullable()
				.references("user-id")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			events.string("event-name").notNullable();
			events.date("date").notNullable();
			events.time("time").notNullable();
			events.string("description").notNullable();
			events.string("address").notNullable();
			events.string("city").notNullable();
			events.string("state").notNullable();
		})
		.createTable("guests", guests => {
			guests.increments("guest-id");
			guests
				.integer("user-id")
				.unsigned()
				.notNullable()
				.references("user-id")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			guests
				.integer("event-id")
				.unsigned()
				.notNullable()
				.references("event-id")
				.inTable("events")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			guests.boolean("attending").defaultTo(null);
		})
		.createTable("food", recipes => {
			recipes.increments("food-id");
			recipes
				.integer("event-id")
				.unsigned()
				.notNullable()
				.references("event-id")
				.inTable("events")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
			recipes.string("recipe-name").notNullable();
			recipes
				.integer("guest-id")
				.unsigned()
				.notNullable()
				.references("user-id")
				.inTable("users")
				.onDelete("CASCADE")
				.onUpdate("CASCADE");
		});
};

exports.down = function(knex) {
	return knex.schema
		.dropTableIfExists("users")
		.dropTableIfExists("events")
		.dropTableIfExists("guests")
		.dropTableIfExists("food");
};
