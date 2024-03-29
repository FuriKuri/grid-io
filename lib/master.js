'use strict';

var http = require('http');

var id = 1;

function notify(nodes, newNode) {
  nodes.forEach(function(node) {
    var postData = JSON.stringify({
      id: node.id,
      ip: newNode.ip,
      port: newNode.port,
      functions: newNode.functions
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
    var req = http.request(options);

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
          port: data.port,
          functions: data.functions
        };
        notify(nodes, node);
        var currentNodes = JSON.stringify(nodes);
        nodes.push(node);
        res.write('{ "ok" : true, "id": ' + node.id + ', "nodes" : ' + currentNodes + ' }');
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
