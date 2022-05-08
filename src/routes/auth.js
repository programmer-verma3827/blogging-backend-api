const express = require("express")
const router = express.Router();

const Controller = require("../controllers");

router.post("/register", async (req, res, next) => {
	let ctr = new Controller.Auth(req, res, next);
	await ctr.executeMethod("register");
});

router.patch("/profile", async (req, res, next) => {
	let ctr = new Controller.Auth(req, res, next);
	await ctr.executeMethod("updateProfile");
});

module.exports = router;