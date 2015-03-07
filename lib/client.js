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

  this.connect(ip, port) {
    console.log('Connenct to Master');
    var postData = JSON.stringify({
      ip: '127.0.0.1',
      port: 1337,
      functions: ['hello']
    });
    var options = {
      hostname: '127.0.0.1',
      port: 1337,
      path: '/node',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    var req = http.request(options, function(res) {
      console.log('STATUS: ' + res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(res.headers));
      var body = '';
      req.on('data', function (chunk) {
        body += chunk;
      });
      req.on('end', function() {
        console.log('Body: ' + body);
      });
    });

    req.write(postData);
    req.end();

  }
}

module.exports = Client;
