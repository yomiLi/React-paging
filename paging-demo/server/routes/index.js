'use strict';

var Router = require('express').Router();
var pageRt = require('./page_router');
var apiRt = require('./api_router');

module.exports = function (app) {
	app.use('/api', apiRt());
	app.use(pageRt());
}