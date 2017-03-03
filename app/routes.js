// require dependincies 
var express = require('express');
var router = express.Router();
var UserController = require('./controllers/UserController');
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
var storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/andrew/SE-Mini/AllinAll/ScreenShots')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

var upload = multer({ storage: storage })
var upload2 = multer({ storage: storage2 })

// get requests 
//router.get('/', projectController.getAllProjects);
router.get('/', function (req, res) {
    res.render('loginView', { UserNotFound: 0 });
})
router.get('/SignUp', function (req, res) {
    res.render('SignUpView', { empty: 0 });
})
router.get('/Home', UserController.getUser);
router.get('/Guest', UserController.gotoGuestHome);
router.get('/AddWork', UserController.gotoAddWork);

//post requests
//router.post('/SignUp', projectController.createUser);
router.post('/SignUp', upload.single("Image"), UserController.createUser);
router.post('/', UserController.checkUser);
router.post('/URL', UserController.addURL);
router.post('/ScreenShot', upload2.single("Pic"), UserController.addScreenShot);

// export router

module.exports = router;