'use strict';

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');
let app = express();

// Use ejs as template engine
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, 'views'));

// Hide server info
app.set('x-powered-by', false);

// Logging
app.use(morgan('combined'));

// Parse form data to req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/assets', express.static(path.join(__dirname, '..', '..', 'public')));

// Mount routes
routes(app);

module.exports = app;
