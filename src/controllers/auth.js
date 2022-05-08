const Base = require("./base");

class Auth extends Base {
          constructor(req, res, next) {
                    super(req, res, next);
          }

          async register() {
                    this.res.send("Hello")
          }
}

module.exports = Auth;