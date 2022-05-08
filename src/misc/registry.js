class Registry {
          constructor() {
                    this._map = {};
          }

          set(name, value) {
                    this._map[name] = value;
          }

          get(name, defValue = null) {
                    return this._map[name] || defValue;
          }

          delete(name) {
                    delete this._map[name];
          }
}

module.exports = new Registry();