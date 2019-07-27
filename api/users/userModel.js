const db = require("../../data/db-config");

module.exports = {
	getAll: function() {
		return db("users").select("user_id", "username", "full_name");
	},

	getById: function(id) {
		return db("users")
			.select("user_id", "username", "full_name")
			.where("user_id", id)
			.first();
	},

	getByUsername: function(username) {
		return db("users")
			.where({ username })
			.first();
	},

	addUser: async function(user) {
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
