const express = require("express")
const router = express.Router();

const Controller = require("../controllers");

router.get("/register", async (req, res, next) => {
	let ctr = new Controller.Auth(req, res, next);
	await ctr.executeMethod("register");
});

module.exports = router;