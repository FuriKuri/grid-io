'use strict';

var proxy = Proxy.create({
  get: function(obj,value) {
    return 'Meh! Nothing like : ' + value;
  }
});

function Grid() {

}

Grid.prototype = Object.create(proxy, {
  constructor: {
    configurable: true,
    enumerable: true,
    value: Grid,
    writable: true
  }
});

console.log(new Grid().hi);

module.exports = Grid;
