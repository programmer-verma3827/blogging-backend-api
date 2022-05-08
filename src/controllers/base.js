const _ = require("lodash");
const Promise = require("bluebird");
const Registry = require("../misc/registry");

class Base {
          constructor(req, res, next) {
                    this.req = req;
                    this.res = res;
                    this.next = next;

                    this.models = Registry.get("models");

                    this._beforeMethods = {};
                    this._afterMethods = {};
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
                          console.log(error);    
                    }
          }
}

module.exports = Base;