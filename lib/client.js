'use strict';

var http = require('http');

function handle(req, res, nodes) {
}

function Client(port) {
  this.port = port;
  var nodes = [];
  this.listen = function() {
    var server = http.createServer(function (req, res) {
      handle(req, res, nodes);
    });
    server.listen(port);
    console.log('Start Client');
  }
}

module.exports = Client;
