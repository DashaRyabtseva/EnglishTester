var key = require('../config.json');
var q = require('q');
var jwt = require('jsonwebtoken');

// var moment = require( 'moment' );

var expires = require('../config.json').expires;;





function refresh(token){
    var defer = q.defer();

    jwt.verify(token, key.refreshsecret, function(err, decoded) {
        if(err) defer.reject(err);
        else{
            // var newtoken = jwt.sign(decoded, key.secret);
            // var newtokenrefresh = jwt.sign(decoded, key.refreshsecret);

            var newtoken = jwt.sign(decoded._doc, key.secret,{
                        expiresIn: expires 
                    });
            var newtokenrefresh = jwt.sign(decoded._doc, key.refreshsecret,{
                        expiresIn: expires 
                    });

            var now = new Date;
            now.setSeconds(now.getSeconds() + expires);
            var utc_timestamp = Date.UTC(now.getUTCFullYear(),now.getUTCMonth(), now.getUTCDate() , 
            now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());


        defer.resolve({token: 'JWT ' + newtoken, refreshToken: 'JWT ' + newtokenrefresh, expiredTime:  utc_timestamp});
  
        }
        
    });

    return defer.promise;
}



exports.refresh = refresh;
exports.adminRegister = function(req, res, next){
    
    if(!req.body.email || !req.body.password){
        res.status(400).send("Bad Request");
        // next("ert");
    }else{
         next();
    }
};

exports.assignStudent = function(req, res, next){
    if(!req.body.students){
	 	// res.json({ success: false, message: 'Please enter email and password.' });    
        res.status(400).send("Bad Request");
        // next("ert");
    }else{
         next();
    }
};
exports.addQuestion = function(req, res, next){
    if(!req.body.finalQue){
	 	// res.json({ success: false, message: 'Please, input correct data.' });
        res.status(400).send("Bad Request");
        // next("ert");
    }else{
         next();
    }
}
exports.assignTeacher = function(req, res, next){
    if(!req.body.userId||!req.body.teacherId||req.body.userId===undefined||req.body.teacherId===undefined){
	 	res.status(400).send("Bad Request");
	 } else{
         next();
    }    
}
exports.getFromReg = function(req, res, next) {
    if(!req.body){
	 	res.status(400).send("Bad Request");
	 } else{
         next();
    }    
}
exports.showStstistics = function(req, res, next){

	if(!req.body.id){	 	
	 	res.status(400).send("Bad Request");
	 } else{
         next();
    }    
}
exports.showTeacherCount = function(req, res, next){    
    if(!req.body.id){	 	
	 	res.status(400).send("Bad Request");
	 } else{
         next();
    }    
}
exports.login = function(req,res, next){
    if(!req.body.email || !req.body.password){	 	
	 	res.status(400).send("Bad Request");
	 } else{
         next();
    }   
}
exports.refresh = function(req, res, next){
    if(!req.header('refresh')){	 	
	 	res.status(400).send("Bad Request");
	 } else{
         next();
    }   
}
exports.getTests = function(req, res, next){
    if(!req.body.tId){	 	
	 	res.status(400).send("Bad Request");
	 } else{
         next();
    } 
}
exports.checkTest = function(req, res, next){
    if(!req.body.Id){	 	
	 	res.status(400).send("Bad Request");
	 } else{
         next();
    } 
}
exports.submit1 = function(req, res, next){
    if(!req.body){	 	
	 	res.status(400).send("Bad Request");
	 } else{
         next();
    } 
}
exports.submit2 = function(req, res, next){
    if(!req.body){	 	
	 	res.status(400).send("Bad Request");
	 } else{
         next();
    } 
}