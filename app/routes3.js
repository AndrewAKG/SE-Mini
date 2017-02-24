// require dependincies 
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');

// add routes
router.get('/Home', projectController.getAllUsers);


//router.post('/', projectController.checkUser);

// export router

module.exports = router;