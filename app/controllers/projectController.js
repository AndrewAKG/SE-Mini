let Project = require('../models/Project');
let User = require('../models/User');

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
    createUser:function(req, res){
        let user = new User(req.body);

        user.save(function(err, user){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{

                console.log(user);
                res.redirect('/Home');
            }
        })
    },
    getAllUsers:function(req, res){
        
        User.find(function(err, users){
            
            if(err)
                res.send(err.message);
            else
                res.render('HomeView', {users});
        })
    }
    ,

     checkUser:function(req, res){
        let user = new User(req.body);

        user.find(function(err, users){
            if(err){
                res.send(err.message)
                console.log(err);
            }
            else{

                console.log(user);
                res.render('HomeView');
            }
        })
     }
}

module.exports = projectController;