'use strict';

var http = require('http');

function handle(req, res, nodes, fns) {
  var body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });

  req.on('end', function () {
    try {
      var node = JSON.parse(body);
      if (req.url === '/notify' && req.method === 'POST') {
        nodes.push(node);
        res.write('{ "ok" : true }');
        console.log(node.id + ' added');
      } else if (req.url === '/execute' && req.method === 'POST') {
        console.log('Execute function');
        fns[node.name]();
        res.write('{ "ok" : true }');
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

function Client(port) {
  this.port = port;
  var nodes = [];
  var fns = {};

  this.add = function(fn, name) {
    console.log('add fn: ' + fn);
    fns[name] = fn;
  };

  this.execute = function(name) {
    console.log('Execute');
    var postData = JSON.stringify({
      function: name
    });
    var options = {
      hostname: '127.0.0.1',
      port: 1338,
      path: '/execute',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };
    var req = http.request(options);

    req.write(postData);
    req.end();
  }

  this.listen = function() {
    var server = http.createServer(function (req, res) {
      handle(req, res, nodes, fns);
    });
    server.listen(port);
    console.log('Start Client');
  };

  this.connect = function(ip, masterPort) {
    console.log('Connenct to Master');
    var postData = JSON.stringify({
      ip: '127.0.0.1',
      port: port,
      functions: Object.keys(fns)
    });
    var options = {
      hostname: '127.0.0.1',
      port: masterPort,
      path: '/node',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': postData.length
      }
    };

    var req = http.request(options, function(res) {
      var body = '';
      res.on('data', function (chunk) {
        body += chunk;
      });
      res.on('end', function() {
        console.log('Body: ' + body);
        var response = JSON.parse(body);
        response.nodes.forEach(function(remoteNode) {
          nodes.push(remoteNode);
          console.log('add node ' + remoteNode.port);
        });
      });
    });

    req.write(postData);
    req.end();

  };
}

module.exports = Client;
