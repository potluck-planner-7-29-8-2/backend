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

//DELETE
router.delete("/:id", middleware.checkEventId, async (req, res) => {
	try {
		const count = await eventDB.remove(req.params.id);
		if (count !== 0) {
			// res.status(200).json(req.event);
			res.status(200).json(count);
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The event could not be removed from the database"
		});
	}
});

router.delete("/:id/guests", middleware.checkEventId, async (req, res) => {
	try {
		if (!req.body.user_id) {
			return res.status(400).json({
				message: "Please ensure information for user_id is included."
			});
		} else {
			const count = await eventDB.removeGuest(req.params.id, req.body.user_id);
			if (count !== 0) {
				const guests = await eventDB.getByIdGuests(req.params.id);
				res.status(200).json(guests);
			} else {
				res.status(404).json({
					message: "That guest was not found on the event guest list"
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The guest could not be removed from the event"
		});
	}
});

router.delete("/:id/recipes", middleware.checkEventId, async (req, res) => {
	try {
		if (!req.body.recipe_name) {
			return res.status(400).json({
				message: "Please ensure information for recipe_name is included."
			});
		} else {
			const count = await eventDB.removeRecipe(
				req.params.id,
				req.body.recipe_name
			);
			if (count !== 0) {
				const recipes = await eventDB.getByIdRecipes(req.params.id);
				res.status(200).json(recipes);
			} else {
				res.status(404).json({
					message: "That recipe was not found on the event recipes list"
				});
			}
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The recipe could not be removed from the event"
		});
	}
});

//PUT
router.put("/:id", middleware.checkEventId, async (req, res) => {
	try {
		if (Object.keys(req.body).length === 0)
			return res
				.status(400)
				.json({ message: "Blank update request detected." });
		const updated = await eventDB.update(req.params.id, req.body);
		res.status(200).json(updated);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error:
				"The event could not be updated in the database, please check request keys"
		});
	}
});

router.put("/:id/guests", middleware.checkEventId, async (req, res) => {
	try {
		let { user_id, attending } = req.body;
		if (Object.keys(req.body).length === 0)
			return res
				.status(400)
				.json({ message: "Blank update request detected." });
		if (!user_id || !attending) {
			return res.status(400).json({
				message:
					"Please ensure information for user_id and attending are included."
			});
		}
		const updated = await eventDB.updateGuest(
			req.params.id,
			user_id,
			attending
		);
		res.status(200).json(updated);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error:
				"The event could not be updated in the database, please check request keys"
		});
	}
});

module.exports = router;
