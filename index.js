'use strict';

var http = require('http');
var app = require('./src/server/webapp');
var config = require('./config');

const server = http.createServer(app);

server.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`);
});
