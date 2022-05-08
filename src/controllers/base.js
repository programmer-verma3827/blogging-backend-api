const _ = require("lodash");
const Registry = require("../misc/registry");

class Base {
          constructor(req, res, next) {
                    this.req = req;
                    this.res = res;
                    this.next = next;

                    this.models = Registry.get("models");
          }
}

module.exports = Base;