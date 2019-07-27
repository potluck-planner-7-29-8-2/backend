const router = require("express").Router();

const eventDB = require("./eventModel");
const middleware = require("../middleware");

// GET
router.get("/", async (req, res) => {
	try {
		const events = await eventDB.getAll(req.query);
		res.status(200).json(events);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The listing of events could not be retrieved."
		});
	}
});

router.get("/:id", middleware.checkEventId, async (req, res) => {
	try {
		const guests = await eventDB.getByIdGuests(req.params.id);
		const food = await eventDB.getByIdFood(req.params.id);
		if (food.length !== 0) {
			res.status(200).json({ ...req.event, guests, food });
		} else {
			res.status(200).json({
				...req.event,
				guests,
				food: "There is no food listed for this event."
			});
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The information for the event specified could not be retrieved."
		});
	}
});

router.get("/:id/guests", middleware.checkEventId, async (req, res) => {
	try {
		const guests = await eventDB.getByIdGuests(req.params.id);
		res.status(200).json(guests);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The guests for the event specified could not be retrieved."
		});
	}
});

router.get("/:id/food", middleware.checkEventId, async (req, res) => {
	try {
		const food = await eventDB.getByIdFood(req.params.id);
		if (food.length !== 0) {
			res.status(200).json(food);
		} else {
			res
				.status(404)
				.json({ message: "There is no food listed for this event." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The food for the event specified could not be retrieved."
		});
	}
});

//POST
router.post(
	"/:id/guests",
	middleware.checkGuest,
	middleware.checkEventId,
	async (req, res) => {
		try {
			const guests = await eventDB.insertGuest(req.params.id, req.body);
			res.status(201).json(guests);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				error: "There was an error while adding the guest to the event"
			});
		}
	}
);

module.exports = router;
