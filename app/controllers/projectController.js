let Project = require('../models/Project');
let User = require('../models/User');
let Work = require('../models/Work');

//var fs = require('fs');
var userSession;


let projectController = {
    
    getAllProjects:function(req, res){
        
        Project.find(function(err, projects){
            
            if(err)
                res.send(err.message);
            else
                res.render('index', {projects});
        })
    },

    createProject:function(req, res){
        let project = new Project(req.body);

        project.save(function(err, project){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{

                console.log(project);
                res.redirect('/');
            }
        })
    },
    addFirstURL:function(req, res){
        let userN = userSession.UserName; 
    let work = new Work({
    UserName : userN });
    
    work.Links.push(req.body);
    
        work.save(function(err, work){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{

                console.log(work);
               // res.redirect('/Home');
            }
        })
    },
    addFirstScreenShot:function(req, res){
        let userN = userSession.UserName; 
    let work = new Work({
    UserName : userN });
    
    work.Links.push(req.body);
    
        work.save(function(err, work){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{

                console.log(work);
               // res.redirect('/Home');
            }
        })
    },
    createUser:function(req, res){
        let user = new User(req.body);
       user.Image = req.file.originalname ;
        user.save(function(err, user){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{           
                userSession=req.session;
        userSession.UserName=req.body.UserName;     
                console.log(user);
                res.redirect('/');
            }
        })
    },
    getUser:function(req, res){
        var user = req.body;
        User.findOne(function(err, user){
            
            if(err)
                res.send(err.message);
            else
                res.render('HomeView', {user});
        })
    },
    gotoGuestHome:function(req, res){
        User.find(function(err, users){
            
            if(err)
                res.send(err.message);
            else
                res.render('GuestHome',{users});
        })
    },

     checkUser:function(req, res){

       User.findOne({UserName:req.body.UserName,PassWord:req.body.PassWord},function(err,user){
       if(err){
        res.send(err.message);
       }
       else if(!user) {
       res.send("balabizooooooo");
       }
       else{
            userSession=req.session;
            userSession.UserName=req.body.UserName;
            res.redirect('/Home');
       }
    })
       }
    
}

module.exports = projectController;
