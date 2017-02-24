// require dependincies 
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');

// add routes
//router.get('/', projectController.getAllProjects);
router.get('/',function(req,res){
    res.render('loginView');
})

router.post('/', projectController.checkUser);

// export router

module.exports = router;