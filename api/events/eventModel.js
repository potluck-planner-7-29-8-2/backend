const db = require("../../data/db-config");
const mappers = require("../mappers");

module.exports = {
	getAll: function() {
		return db("events");
	},

	getById: function(id) {
		return db("events")
			.where("event_id", id)
			.first();
	},

	getByIdGuests: function(id) {
		return db("events as e")
			.join("guests as g", "g.event_id", "e.event_id")
			.join("users as u", "u.user_id", "g.user_id")
			.where("e.event_id", id)
			.select("u.user_id", "u.full_name", "g.attending")
			.orderBy("u.user_id")
			.then(guests =>
				guests ? guests.map(guest => mappers.displayTrueFalse(guest)) : null
			);
	},

	getByIdFood: function(id) {
		return db("food as f")
			.join("events as e", "f.event_id", "e.event_id")
			.join("users as u", "u.user_id", "f.user_id")
			.where("e.event_id", id)
			.select("f.recipe_name", "u.user_id", "u.full_name")
			.orderBy("f.recipe_name");
	},

	insert: function(event) {
		return db("events")
			.insert(event)
			.then(([id]) => this.getById(id).first());
	},

	insertGuest: function(event_id, guest) {
		return db("guests")
			.insert({
				event_id,
				user_id: guest.user_id,
				attending: guest.attending
			})
			.then(() => this.getByIdGuests(event_id));
	},

	update: function(id, changes) {
		return db("events")
			.where("event_id", id)
			.update(changes)
			.then(count => (count > 0 ? this.getById(id) : null));
	},

	remove: function(id) {
		return db("events")
			.where("event_id", id)
			.del()
			.then(() => this.getAll());
	}
};
