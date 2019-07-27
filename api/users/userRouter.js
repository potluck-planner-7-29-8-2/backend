const router = require("express").Router();

const userDB = require("./userModel");
const middleware = require("../middleware");

router.get("/", async (req, res) => {
	try {
		const users = await userDB.getAll(req.query);
		res.status(200).json(users);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The listing of users could not be retrieved."
		});
	}
});

router.get("/:id", middleware.checkUserId, async (req, res) => {
	try {
		const events = await userDB.getByIdEvents(req.params.id);
		if (events.length !== 0) {
			res.status(200).json({ ...req.user, events });
		} else {
			res
				.status(200)
				.json({
					...req.user,
					events: "There are no events listed for this user"
				});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The information for the user specified could not be retrieved."
		});
	}
});

router.get("/:id/events", middleware.checkUserId, async (req, res) => {
	try {
		const events = await userDB.getByIdEvents(req.params.id);
		if (events.length !== 0) {
			res.status(200).json(events);
		} else {
			res
				.status(404)
				.json({ message: "There are no events listed for this user." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The events for the user specified could not be retrieved."
		});
	}
});

module.exports = router;
