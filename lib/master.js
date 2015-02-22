var net = require('net');

function Master() {
  this.listen = function(port) {
    var server = net.createServer(function(c) {

    }
    server.listen(port, function() {
      console.log('Server started...');
    });
  };
}

module.exports = Master;
