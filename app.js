const _ = require("lodash");
const express = require("express");
const app = express();

const env = process.env.NODE_ENV || "development";
const config = require(`./${env}.config.json`);

const dbClient = require("./src/misc/db/client");
const Registry = require("./src/misc/registry");

// Creating MongoDB Connection
let mongoObj = new dbClient.MongoDB(config.database.mongodb);
let mongoDBConn = mongoObj.createConnection();
Registry.set("mongodb", mongoDBConn);

// Initializing models from schema on MongoDB Database Connection
let schemaList = require("./src/models");
let models = {};
_.each(schemaList, (schema, key) => {
	models[key] = mongoDBConn.model(key, schema);
});
Registry.set("models", models);

// Adding Middleware for Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Initializing Routes
let routerList = require("./src/routes");
_.each(routerList, (router, key) => {
	app.use(router);
});

app.listen(config.app.port, () => {
	console.log(`Application started on port ${config.app.port}`);
});