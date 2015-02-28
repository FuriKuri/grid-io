#!/usr/bin/env node

var Master = require('./lib/master');

new Master(1337).listen();
