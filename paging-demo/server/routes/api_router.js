var express = require('express');
var router = express.Router();
var apiController = require('../controllers/apiController');

module.exports = function (app) {

	router.get('/test', apiController.test);

	return router;
}