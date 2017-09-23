'use strict';

let config = {
  port: process.env.PORT || 3000,
  gapi: {
    clientId: '',
    clientSecret: '',
    redirectUrl: 'http://localhost:3000/oauth2callback'
  }
};

let environmentSettings = {};
switch (process.env.NODE_ENV) {
  case 'production':
    environmentSettings = require('./production');
    break;
  case 'test':
    environmentSettings = require('./test');
    break;
  default:
    environmentSettings = require('./development');
    break;
}
config = Object.assign(config, environmentSettings);

module.exports = config;
