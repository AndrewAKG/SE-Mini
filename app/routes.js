// require dependincies 
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');

// get requests 
//router.get('/', projectController.getAllProjects);
router.get('/',function(req,res){
    res.render('loginView');
})
router.get('/SignUp',function(req,res){
    res.render('SignUpView');
})
router.get('/Home', projectController.getAllUsers);

//post requests
router.post('/SignUp', projectController.createUser);
router.post('/', projectController.checkUser);

// export router

module.exports = router;