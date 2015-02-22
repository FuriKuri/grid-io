'use strict';

function Node() {

}

Node.prototype.ip = null;
Node.prototype.port = null;

Node.prototype.init = function(ip, port) {
  Node.prototype.ip = ip;
  Node.prototype.port = port;
};

module.exports = Node;
