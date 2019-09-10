const path = require('path');

const envPath = path.join(__dirname, '.env');
require('node-env-file')(envPath);

const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const cors = require('cors');

const { NODE_ENV } = process.env;
if (NODE_ENV !== 'test') require('./config/db');
const routes = require('./routes');
const routeErrorHandler = require('./middlewares/errors');
require('./config/passport');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression());
app.use(helmet());
app.use(cors());

app.use('/', routes);
app.use(routeErrorHandler);

if (NODE_ENV === 'development') app.use(require('./config/errorHandler'));

module.exports = app;
