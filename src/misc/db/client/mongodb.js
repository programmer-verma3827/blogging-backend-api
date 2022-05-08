const _ = require("lodash");
const mongoose = require("mongoose");

class MongoDB {
	constructor(config, options = {}) {
		this.config = config;
		this.options = options;
	}

	createConnection() {
		let connString = `mongodb://${this.config.host}:${this.config.port}/${this.config.db}?${this.config.options}`;
		if (_.size(this.config.user) > 0 && _.size(this.config.password) > 0) {
			connString = `mongodb://${this.config.user}:${this.config.password}@${this.config.host}:${this.config.port}/${this.config.db}?${this.config.options}`;
		}
		return mongoose.createConnection(connString, this.options);
	}
}

module.exports = MongoDB;