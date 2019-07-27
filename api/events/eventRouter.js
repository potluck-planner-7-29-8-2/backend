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
		const recipes = await eventDB.getByIdRecipes(req.params.id);
		if (recipes.length !== 0) {
			res.status(200).json({ ...req.event, guests, recipes });
		} else {
			res.status(200).json({
				...req.event,
				guests,
				recipes: "There are no recipes listed for this event."
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

router.get("/:id/recipes", middleware.checkEventId, async (req, res) => {
	try {
		const recipes = await eventDB.getByIdRecipes(req.params.id);
		if (recipes.length !== 0) {
			res.status(200).json(recipes);
		} else {
			res
				.status(404)
				.json({ message: "There are no recipes listed for this event." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The recipes for the event specified could not be retrieved."
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

router.post(
	"/:id/recipes",
	middleware.checkRecipe,
	middleware.checkEventId,
	async (req, res) => {
		try {
			const recipes = await eventDB.insertRecipe(req.params.id, req.body);
			res.status(201).json(recipes);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				error: "There was an error while adding the recipe to the event"
			});
		}
	}
);

module.exports = router;
