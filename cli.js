#!/usr/bin/env node

var Master = require('./lib/master');

var Node = require('./lib/client');

new Master(1337).listen();

var client = new Client(1338);
client.listen();
client.connect('127.0.0.1', 1337);
