const express = require("express")
const router = express.Router();

const Controller = require("../controllers");

router.get("/login", (req, res, next) => {
	let auth = new Controller.Auth(req, res, next);
	auth.login();	
});

router.post("/register", (req, res, next) => {
	res.send("Yo")
});

module.exports = router;