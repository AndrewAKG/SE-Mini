let User = require('../models/User');

//var fs = require('fs');
var userSession;


let userController = {

    //User Adding Links
    addURL: function (req, res) {
        if (req.body.title == "" || req.body.link == "") {
            let userN = userSession.UserName;
            User.findOne({ UserName: userN }, function (err, user) {

                if (err)
                    res.send(err.message);
                else {
                    res.render('HomeView', { user, empty: 1 });
                }
            })
        }
        else {
            let userN = userSession.UserName;
            User.findOne({ UserName: userN }, function (err, user) {
                if (err) {
                    res.send(err.message)
                    console.log(err);
                }
                else {
                    user.Links.push(req.body);
                    user.save(function (err) { });
                    console.log(req.body);
                    res.redirect('/Home');
                }
            })
        }
    },
    //User Adding ScreenShots  
    addScreenShot: function (req, res) {
        if (!(req.file) || req.body.title == "") {
            let userN = userSession.UserName;
            User.findOne({ UserName: userN }, function (err, user) {

                if (err)
                    res.send(err.message);
                else {
                    res.render('HomeView', { user, empty: 2 });
                }
            })
        } else {
            let userN = userSession.UserName;
            let pic = req.file.originalname;
            User.findOne({ UserName: userN }, function (err, user) {
                if (err) {
                    res.send(err.message)
                    console.log(err);
                }
                else {
                    user.ScreenShots.push({ title: req.body.title, Pic: pic });
                    user.save(function (err) { });

                    console.log(user);
                    res.redirect('/Home');
                }
            })
        }
    },
    //User SignUp
    createUser: function (req, res) {
        if ((req.body.UserName == "") || (req.body.PassWord == "") || (req.body.FirstName == "") || (req.body.LastName == "")) {
            res.render('SignUpView', { empty: 1 })
        }
        else {
            let user = new User(req.body);
            if (req.file) {

                user.Image = req.file.originalname;
                user.save(function (err, user) {
                    if (err) {
                        res.send(err.message)
                        console.log(err);
                    }
                    else {
                        userSession = req.session;
                        userSession.UserName = req.body.UserName;
                        console.log(user);
                        res.redirect('/AddWork');
                    }
                })
            } else {
                user.save(function (err, user) {
                    if (err) {
                        res.send(err.message)
                        console.log(err);
                    }
                    else {
                        userSession = req.session;
                        userSession.UserName = req.body.UserName;
                        console.log(user);
                        res.redirect('/AddWork');
                    }
                })
            }
        }
    },
    //User AddingWork FirstTime
    gotoAddWorkWithin: function (req, res) {
        let userN = userSession.UserName;
        User.findOne({ UserName: userN }, function (err, user) {

            if (err)
                res.send(err.message);
            else {
                res.render('HomeView', { user, empty: 0 });
            }
        })
    },
    //User AddingWork Usually
    gotoAddWorkWithout: function (req, res) {
        let userN = userSession.UserName;
        User.findOne({ UserName: userN }, function (err, user) {

            if (err)
                res.send(err.message);
            else {
                res.render('HomeView', { user, empty: 3 });
            }
        })
    },
    //User Portfolio Page
    getUser: function (req, res) {
        let userN = userSession.UserName;
        User.findOne({ UserName: userN }, function (err, user) {

            if (err)
                res.send(err.message);
            else
                res.render('PortfolioPage', { user });
        })
    },
    //Guest Login
    gotoGuestHome: function (req, res) {
        User.paginate({}, { page: 1, limit: 10 }, function (err, users) {
            if (err)
                res.send(err.message);
            else{
                console.log(users.pages)
                res.render('GuestHome', { Users: users });
            }
            // result.docs
            // result.total
            // result.limit - 10
            // result.page - 3
            // result.pages
        });
    },
    //Login Check
    checkUser: function (req, res) {
        if (req.body.UserName == "" || req.body.PassWord == "") {
            res.render('loginView', { UserNotFound: 2 })
        } else {
            User.findOne({ UserName: req.body.UserName, PassWord: req.body.PassWord }, function (err, user) {
                if (err) {
                    res.send(err.message);
                }
                else if (!user) {
                    res.render('loginView', { UserNotFound: 1 });
                }
                else {
                    userSession = req.session;
                    userSession.UserName = req.body.UserName;
                    res.redirect('/Home');
                }
            })
        }
    }
}

module.exports = userController;
