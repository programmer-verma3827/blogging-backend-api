const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid")

class Utility {
          constructor() {}

          static generateMongoId() {
                    return mongoose.Types.ObjectId()
          }

          static generateApiKey() {
                    return uuidv4()
          }
}

module.exports = Utility;