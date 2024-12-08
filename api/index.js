const express = require('express');
const path = require('path');
const logger = require('morgan');
const app = express();
const methodOverride = require('method-override')
require('dotenv').config({path: '../config/.env'})

// routes
const mainRoutes = require('./routes')

// view engine setup
app.set('views', path.join(__dirname, '../views'));
console.log(__dirname);
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'))

app.use('/', mainRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
})

module.exports = app;