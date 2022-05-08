const Base = require("./base");

const Utility = require("../misc/utility");

class Auth extends Base {
          constructor(req, res, next) {
                    super(req, res, next);

                    this._beforeMethods = {
                              "updateProfile": ["_secure"]
                    }
          }

          async register() {
                    const reqBody = this.req.body;
                    let userExist = await this.models.User.findOne({email: reqBody.email});
                    if (userExist) {
                              return this.res.json({success: false, message: "User already exist with email address"});
                    }
                    let user = new this.models.User({
                              _id: Utility.generateMongoId(),
                              name: reqBody.name,
                              email: reqBody.email,
                              password: reqBody.password,
                              apikey: Utility.generateApiKey()
                    });
                    try {
                              await user.save();
                    } catch (error) {
                              this.throwError("301");
                    }
                    this.res.json({
                              success: true,
                              message: "User created successfully"
                    })
          }

          async updateProfile() {
                    let reqBody = this.req.body;
                    let user = this.req.user;
                    user.name = reqBody.name;
                    try {
                              await user.save();
                              this.req.user = user;
                    } catch (error) {
                              this.throwError("301");
                    }
                    this.res.json({
                              success: true,
                              message: "user updated successfully"
                    })
          }
}

module.exports = Auth;