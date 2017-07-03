var express = require('express');
var router = express.Router();
var pageController = require('../controllers/pageController');

module.exports = function (app) {

	router.get('/*', pageController.home);

	return router;
}