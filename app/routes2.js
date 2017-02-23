var express = require('express');
var router = express.Router();

// add routes
//router.get('/', projectController.getAllProjects);
router.get('/SignUp',function(req,res){
    res.render('SignUp');
})

//router.post('/project', projectController.createProject);

// export router

module.exports = router;