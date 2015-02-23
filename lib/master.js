'use strict';

var http = require('http');

var id = 1;

function handle(req, res, nodes) {
  var body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    try {
      var data = JSON.parse(body);
      if (req.url === '/node' && req.method === 'POST') {
        nodes.push({
          ip: data.ip,
          port: data.port
        });
        res.write('{ "ok" : true, "id": ' + id++ + ' }');
      } else {
        res.write(typeof data);
      }
      res.end();
    } catch (er) {
      res.statusCode = 400;
      return res.end('error: ' + er.message);
    }
  });
}

function Master(port) {
  var nodes = [];
  this.listen = function() {
    var server = http.createServer(function (req, res) {
      handle(req, res, nodes);
    });
    server.listen(port);
  };
}

module.exports = Master;

new Master(1337).listen();
