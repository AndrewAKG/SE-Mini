// require dependincies 
var express = require('express');
var router = express.Router();
var projectController = require('./controllers/projectController');
var multer = require('multer');
//var upload = multer({ dest: './controllers/uploads'});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/andrew/SE-Mini/AllinAll/profileImages')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

// get requests 
//router.get('/', projectController.getAllProjects);
router.get('/',function(req,res){
    res.render('loginView');
})
router.get('/SignUp',function(req,res){
    res.render('SignUpView');
})
router.get('/Home', projectController.getUser);
router.get('/Guest',projectController.gotoGuestHome)

//post requests
//router.post('/SignUp', projectController.createUser);
router.post('/SignUp',upload.single("Image"), projectController.createUser);
router.post('/', projectController.checkUser);
router.post('/URL',projectController.addFirstURL);
router.post('/ScreenShot',upload.single("Image"),projectController.addFirstScreenShot);

// export router

module.exports = router;