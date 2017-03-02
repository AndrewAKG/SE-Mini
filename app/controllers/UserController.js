let User = require('../models/User');

//var fs = require('fs');
var userSession;


let userController = {
    
//User Adding Links
    addURL:function(req, res){
        let userN = userSession.UserName; 

        User.findOne({UserName:userN},function(err, user){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
             user.Links.push(req.body);
             user.save(function(err){});
                console.log(req.body);
                res.redirect('/Home');
            }
        })
    },
//User Adding ScreenShots  
    addScreenShot:function(req, res){
        let userN = userSession.UserName; 
        let pic = req.file.originalname ;;
    
        User.findOne({UserName:userN},function(err, user){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{
           user.ScreenShots.push({title : req.body.title,Pic : pic});
           user.save(function(err){});

                console.log(user);
                res.redirect('/Home');
            }
        })
    },
//User SignUp
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
                res.redirect('/AddWork');
            }
        })
    },
//User AddingWork
    gotoAddWork:function(req,res){
        let userN = userSession.UserName; 
        User.findOne({UserName:userN},function(err, user){
            
            if(err)
                res.send(err.message);
            else{
            res.render('HomeView',{user});
        }    
    })
    },
//User Portfolio Page
    getUser:function(req, res){
        let userN = userSession.UserName; 
        User.findOne({UserName:userN},function(err, user){
            
            if(err)
                res.send(err.message);
            else
            res.render('PortfolioPage',{user});
        })
    },
//Guest Login
    gotoGuestHome:function(req, res){
        User.find(function(err, users){
            
            if(err)
                res.send(err.message);
            else
                res.render('GuestHome',{users});
        })
    },
//Login Check
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

module.exports = userController;
