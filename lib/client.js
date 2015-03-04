function Client(port) {
  this.port = port;

  this.listen = function() {
    console.log('Start Client');
  }
}

module.exports = Client;
