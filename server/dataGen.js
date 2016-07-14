var mongo = require('./db/mongo');
var prompt = require('prompt');
var service = require('./services/userService');
var bodyParser = require('body-parser');
var q = require('q');
var faker = require('faker');

var addUser = function(_name,_pass,_type,count){
			var defer = q.defer();
			var prom = [];
			for(i =0; i<count; i++){
				prom.push(service.addNewUser2({
							email: _name+(i+1)+"@exadel.com", 
							pass: _pass+(i+1),
							type: _type,
							firstName: faker.fake("{{name.firstName}}"),
							lastName: faker.fake("{{name.lastName}}")
							}));

			}
			return q.all(prom);
		
}
var addAll = function(admin,user,teacher,guest){
		addUser("admin","apass","Admin",admin).then(function(data){
		  	 console.log(admin + " Admins created");
		  }).catch(function (err) {
			 console.log(err);
		});
		addUser("user","upass","User",user).then(function(data){
		 	 console.log(user + " Users created");
		  }).catch(function (err) {
			 console.log(err);
		});
		addUser("teacher","tpass","Teacher",teacher).then(function(data){
			 console.log(teacher+ " Teachers created");
		  }).catch(function (err) {
			 console.log(err);
		});
		addUser("guest","gpass","Guest",guest).then(function(data){
		  	 console.log(guest + " Guests created");
		  }).catch(function (err) {
			 console.log(err);
		});
}
var args = process.argv.slice(2);
if(args == '-d'){
	console.log('Default dataGen. Please, wait...');
	service.removeCollection().then(function(data){
		addAll(3,10,3,3);
		  }).catch(function (err) {
			 console.log(err);
	});
	

}
else {
	prompt.start();
	console.log("Input numbers of roles: ");
	prompt.get(['Admin', 'User','Teacher','Guest'], function (err, result) {
	  	console.log('Please, wait...');
	   service.removeCollection().then(function(data){
	   		addAll(result.Admin,result.User,result.Teacher,result.Guest);
		  }).catch(function (err) {
			 console.log(err);
		});
	
		
	});
}


