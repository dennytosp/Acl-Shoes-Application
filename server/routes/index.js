var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var auth = require ('../utilities/authen');
var userController = require('../controllers/userController');
var adminController = require('../controllers/adminController');



/* GET home page. */

router.get("/", auth.authenticate, function (req, res, next) {
  res.redirect('/admin');

});


router.get("/login", function (req, res, next) {
  res.render("login", { title: "Sign in" });
});
// username == 'abc' && password == '123'
// POST Login Page
router.post("/login", async function (req, res, next) {
  let {username, password} = req.body
  let user = await userController.login(username, password)
  let admin = await adminController.login(username, password)
  // console.log('>>>>>>>>>>>>>>>>>',user);
  if (user){
    var token = jwt.sign ({user}, process.env.JWT_KEY);
    req.session.token = token
    res.redirect('/admin')
  }else if(admin){
    var token = jwt.sign ({admin}, process.env.JWT_KEY);
    req.session.token = token
    res.redirect('/admin')
  }else{
    res.redirect('/login')
  }
});

// GET logout
router.get("/log-out", function (req, res, next) {

  req.session.destroy(function(err) {
  res.redirect('/login');
  })
});

router.post("/screen-lock", async function (req, res, next) {
  let {password} = req.body
  let user = await userController.screenlock(password)
  if (user){
    var token = jwt.sign ({user}, process.env.JWT_KEY);
    req.session.token = token
    res.redirect('/admin')
  }else{
    res.redirect('/admin/screen-lock')
  }
});

// GET REGISTER
router.get("/register", function (req, res, next) {
  res.render("register", { title: "Register" });
});

// GET FORGOT PASSWORD
router.get("/forgot-password", function (req, res, next) {
  res.render("forgot-password", { title: "Forgot Password" });
});




module.exports = router;
