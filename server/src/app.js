const express = require('express');
const app = express()
const helmet = require('helmet');
const mongoose = require('mongoose');
const config = require('../config');
const middleware_main = require('../middleware/main');
const middleware_err = require('../middleware/err');
const logger = require('../util/logger');
const db = require('../db');

const api = require('./api');

app.use(helmet());
app.disable('x-powered-by');

db(config.db.connStr);

middleware_main(app);
app.use('/api', api);
middleware_err(app);

module.exports = app;
