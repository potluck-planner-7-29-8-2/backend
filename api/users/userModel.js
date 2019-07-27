const db = require("../../data/db-config");
const mappers = require("../mappers");

module.exports = {
	getAll: function() {
		return db("users").select("user_id", "username", "full_name");
	},

	getById: function(id) {
		return db("users as u")
			.where("user_id", id)
			.select("u.user_id", "u.username", "u.full_name")
			.first();
	},

	getByIdEvents: function(id) {
		return db("guests as g")
			.join("events as e", "g.event_id", "e.event_id")
			.where("user_id", id)
			.select(
				"g.event_id",
				"g.attending",
				"e.organizer_id",
				"e.event_name",
				"e.date",
				"e.time",
				"e.description",
				"e.address",
				"e.city",
				"e.state"
			)
			.orderBy("g.event_id")
			.then(events =>
				events ? events.map(event => mappers.displayTrueFalse(event)) : null
			);
	},

	getByUsername: function(username) {
		return db("users")
			.where({ username })
			.first();
	},

	insert: async function(user) {
		const [id] = await db("users").insert(user);
		return this.getById(id);
	},

	update: function(id, full_name) {
		return db("users")
			.where("user_id", id)
			.update(full_name)
			.then(count => (count > 0 ? this.getById(id) : null));
	},

	remove: function(id) {
		return db("users")
			.where("user_id", id)
			.del()
			.then(() => this.getAll());
	}
};
