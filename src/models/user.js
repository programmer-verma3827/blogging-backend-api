const _ = require("lodash");
const { Schema } = require("mongoose");

const schemaOpts = require("./common/options");

let schema = new Schema({
          _id: {
                    type: Schema.Types.ObjectId
          },
          name: {
                    type: String,
                    required: true,
                    minlength: 3,
                    maxlength: 32
          },
          email: {
                    type: String,
                    required: true
          },
          password: {
                    type: String,
                    required: true,
                    bcrypt: true
          },
          apikey: {
                    type: String,
                    required: true
          }
}, _.extend({ collection: "users" }, schemaOpts));

schema.plugin(require("mongoose-bcrypt"));

module.exports = schema;