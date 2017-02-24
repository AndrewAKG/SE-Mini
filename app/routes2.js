var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');


// add routes
//router.get('/', projectController.getAllProjects);
router.get('/SignUp',function(req,res){
    res.render('SignUpView');
})

router.post('/SignUp', projectController.createUser);

// export router

module.exports = router;