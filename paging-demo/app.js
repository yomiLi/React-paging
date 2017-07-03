'use strict';
var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');

var app = express();

app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

app.use(favicon(path.join(__dirname, './public', 'favicon.ico')));

app.use(express.static(path.join('./public')));

var Router = require('./server/routes');
Router(app);

module.exports = app;