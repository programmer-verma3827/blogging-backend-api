const { Schema } = require("mongoose");

let schema = new Schema({
          _id: {
                    type: Schema.Types.ObjectId,
                    required: true
          },
          name: {
                    type: String,
                    required: true
          },
          email: {
                    type: String,
                    required: true
          },
          password: {
                    type: String,
                    required: true
          },
          created: {
                    type: Date,
                    required: true
          },
          modified: {
                    type: Date,
                    required: true
          }
}, { collection: "users" });

module.exports = schema;