var express = require('express');
var contracts = require('./contracts');
var service = require('../services/userService');
var path = require("path");
var router = express.Router();

// var bodyParser = require('body-parser');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var key = require('../config.json');


router.use(passport.initialize());
require('../passport')(passport);

// router.use(bodyParser.urlencoded({ extended: false }));
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: true}));

router.get('/getAll',passport.authenticate('jwt', { session: false }), function(req, res) {
	
  		service.getAllUsers().then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });

});
router.get('/getUsers', function(req, res) {
  		service.getAllRole('User').then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });

});
router.get('/getTeachers', function(req, res) {
  		service.getAllRole('Teacher').then(function(data){
			  res.send(JSON.stringify(data));
		  }).catch(function (err) {
			  res.send(JSON.stringify(err));
		  });

});

router.post('/register',function(req, res) {
	if(!req.body.email || !req.body.password) {
    	res.json({ success: false, message: 'Please enter email and password.' });
  	} else {
		service.addNewUser(req.body.email, req.body.password, req.body.name).then(function(data){
			res.json(data);
		}).catch(function(err){
			res.json(err);
		});

  }

});

router.post('/login',function (req, res) {

	service.authenticate(req.body.email, req.body.password).then(function (data) {
		res.json(data);
	}).catch(function (err) {
		// res.json(err);
		res.status(401).send("unauthorized");
	});
	
});

// router.post('/refresh',function(req, res){
// 	contracts.refresh()
// });


router.get('/refresh', passport.authenticate('jwt', { session: false }), function(req, res) {
	 contracts.refresh(req.header('refresh')).then(function(data){
		 res.json(data);
	 }).catch(function(err){
		 res.json(err);
	 });	
});


module.exports = router;