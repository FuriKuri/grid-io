#!/usr/bin/env node

var Master = require('./lib/master');

var Node = require('./lib/client');

new Master(1337).listen();

new Client(1338).listen();
