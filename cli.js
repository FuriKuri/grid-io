#!/usr/bin/env node

var Master = require('./lib/master');

var Client = require('./lib/client');

new Master(1337).listen();

var client = new Client(1338);
client.listen();
client.connect('127.0.0.1', 1337);

var client2 = new Client(1339);
client2.listen();
client2.connect('127.0.0.1', 1337);
