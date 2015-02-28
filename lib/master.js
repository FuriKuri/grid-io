'use strict';

var http = require('http');

var id = 1;

function notify(nodes, newNode) {
  nodes.forEach(function(node) {
    var postData = JSON.stringify({
      ip: newNode.ip,
      port: newNode.port
    });
    var options = {
      hostname: node.ip,
      port: node.port,
      path: '/notify',
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
  });

}

function handle(req, res, nodes) {
  var body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    try {
      var data = JSON.parse(body);
      if (req.url === '/node' && req.method === 'POST') {
        var node = {
          id: id++,
          ip: data.ip,
          port: data.port
        };
        notify(nodes, node);
        nodes.push(node);
        res.write('{ "ok" : true, "id": ' + node.id + ' }');
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
