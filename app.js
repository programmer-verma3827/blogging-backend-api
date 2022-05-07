const express = require("express");
const app = express();

const env = process.env.NODE_ENV;
const config = require(`./${env}.config.json`);

app.listen(config.app.port, () => {
          console.log(`Application started on port ${config.app.port}`);
});