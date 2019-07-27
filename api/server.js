const express = require("express");
const server = express();
const cors = require("cors");
const helmet = require("helmet");

const authRouter = require("./auth/authRouter");
const userRouter = require("./users/userRouter");
const eventRouter = require("./events/eventRouter");

server.get("/", (req, res) => {
	res.send(`<h2>Potluck Planner</h2>`);
});

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/users", authRouter);
server.use("/users", userRouter);
server.use("/events", eventRouter);

server.use(errorHandler);

function errorHandler(error, req, res, next) {
	console.log(error);
	res.status(500).json({ error: "Data could not be retrieved" });
}

module.exports = server;
