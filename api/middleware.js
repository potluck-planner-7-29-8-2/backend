const userDB = require("./users/userModel.js");
const eventDB = require("./events/eventModel.js");
const foodDB = require("./food/foodModel.js");

module.exports = {
	checkUser,
	checkUserRegister,
	checkUserLogin,
	checkUserId,
	checkEvent,
	checkEventId,
	checkFood,
	checkFoodId
};

async function checkUserId(req, res, next) {
	try {
		const user = await userDB.getById(req.params.id);
		if (user) {
			req.user = user;
			next();
		} else {
			res.status(404).json({ message: "User ID Could Not Be Found." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The user information could not be retrieved."
		});
	}
}

function checkUser(req, res, next) {
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({ message: "Missing User Data." });
	const { username, password, full_name } = req.body;
	if (!username || !password || !full_name)
		return res.status(400).json({
			message:
				"Please ensure information for username, password, and full_name is included."
		});
	next();
}

async function checkUserRegister(req, res, next) {
	try {
		const user = await userDB.getByUsername(req.body.username);
		if (user && req.body.username === user.username) {
			res.status(401).json({
				message: "Username is already in use, please choose another."
			});
		} else {
			next();
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "Something went wrong."
		});
	}
}

function checkUserLogin(req, res, next) {
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({ message: "Missing User Data." });
	const { username, password, full_name } = req.body;
	if (!username || !password || !full_name)
		return res.status(400).json({
			message:
				"Please ensure information for username and password is included."
		});
	next();
}

async function checkEventId(req, res, next) {
	try {
		const event = await eventDB.getById(req.params.id);
		if (event) {
			req.event = event;
			next();
		} else {
			res.status(404).json({ message: "Event ID Could Not Be Found." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The event information could not be retrieved."
		});
	}
}

function checkEvent(req, res, next) {
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({ message: "Missing Event Data." });
	const {
		event_name,
		date,
		time,
		description,
		address,
		city,
		state
	} = req.body;
	if (
		!event_name ||
		!date ||
		!time ||
		!description ||
		!address ||
		!city ||
		!state
	)
		return res.status(400).json({
			message:
				"Please ensure information for event_name, date, time, description, address, city, and state are included."
		});
	next();
}

async function checkFoodId(req, res, next) {
	try {
		const food = await foodDB.getById(req.params.id);
		if (food) {
			req.food = food;
			next();
		} else {
			res.status(404).json({ message: "Food ID Could Not Be Found." });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({
			error: "The food information could not be retrieved."
		});
	}
}

function checkFood(req, res, next) {
	if (Object.keys(req.body).length === 0)
		return res.status(400).json({ message: "Missing Food Data." });
	const { recipe_name } = req.body;
	if (!recipe_name)
		return res.status(400).json({
			message: "Please ensure information for recipe_name is included."
		});
	next();
}
