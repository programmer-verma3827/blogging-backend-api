const _ = require("lodash");
const Promise = require("bluebird");
const Registry = require("../misc/registry");

const ERROR_LIST = {
          "101": {statusCode: 400, errorCode: "101", codeMsg: "API_KEY_MISSING", message: "Api Key not provided in request"},
          "102": {statusCode: 400, errorCode: "102", codeMsg: "INVALID_API_KEY", message: "Invalid Api Key"},
          "301": {statusCode: 400, errorCode: "301", codeMsg: "DATA_SAVING_FAILED", message: "Data Saving Failed"},
          "502": {statusCode: 502, errorCode: "502", codeMsg: "SERVER_ERROR", message: "Internal Server Error"}
}

class Base {
          constructor(req, res, next) {
                    this.req = req;
                    this.res = res;
                    this.next = next;

                    this.models = Registry.get("models");

                    this._beforeMethods = {};
                    this._afterMethods = {};

                    this.error = null;
          }

          throwError(code, message = null) {
                    let err = ERROR_LIST[code];
                    if (!err) {
                              throw new Error("Internal Error");
                    }
                    if (_.size(message) > 0) {
                              err.message = message;
                    }
                    this.error = err;
                    throw new Error(error.codeMsg);
          }

          async _executeBeforeMethods(methodName) {
                    if (_.size(this._beforeMethods) == 0 || !this._beforeMethods[methodName] || _.size(this._beforeMethods[methodName]) == 0) {
                              return;
                    }
                    await Promise.each(this._beforeMethods[methodName], async (m) => {
                              await this[m]();
                    });
          }
          
          async _executeAfterMethods(methodName) {
                    if (_.size(this._afterMethods) == 0 || !this._afterMethods[methodName] || _.size(this._afterMethods[methodName]) == 0) {
                              return;
                    }
                    await Promise.each(this._afterMethods[methodName], async (m) => {
                              await this[m]();
                    });
          }

          async executeMethod(methodName, ...args) {
                    try {
                              await this._executeBeforeMethods(methodName);
                              await this[methodName](...args);
                              await this._executeAfterMethods(methodName);
                    } catch (error) {
                              if (this.error) {
                                        this.res.status(this.error.statusCode);
                                        this.res.json({success: false, error: this.error});
                                        return;
                              }
                              // Log the unhandled error
                              this.res.status(502);
                              this.res.json({success: false, error: ERROR_LIST["502"]})
                    }
          }

          async _secure() {
                    let apiKey = this.req.headers["API-KEY"] || this.req.headers["api-key"];
                    if (!apiKey) {
                              this.throwError("101");
                    }
                    let user = await this.models.User.findOne({apikey: apiKey});
                    if (!user) {
                              this.throwError("102");
                    }
                    this.req.user = user;
          }
}

module.exports = Base;