#!/usr/bin/env node

var Master = require('./lib/master');

var Node = require('./lib/node');

new Master(1337).listen();

new Node(1338).listen();
