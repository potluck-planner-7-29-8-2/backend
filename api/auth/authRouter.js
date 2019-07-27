const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userDB = require("../users/userModel");
const middleware = require("../middleware");

router.post(
	"/register",
	middleware.checkUser,
	middleware.checkUserRegister,
	async (req, res) => {
		try {
			const hash = bcrypt.hashSync(req.body.password, 10);
			req.body.password = hash;
			const user = await userDB.addUser(req.body);
			res.status(201).json(user);
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "Something went wrong." });
		}
	}
);

function generateToken(user) {
	const jwtPayload = {
		subject: user.id,
		username: user.username,
		full_name: user.full_name
	};

	const jwtOptions = {
		expiresIn: "1d"
	};

	return jwt.sign(jwtPayload, process.env.JWT_SECRET, jwtOptions);
}

module.exports = router;
