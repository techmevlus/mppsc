require('dotenv').config();

const express = require('express');
const jwt = require('jsonwebtoken');
const utils = require('./utils');

var app = express();
var bodyParser = require('body-parser'); //BODY Parser - lets us use the req.body
// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

var mongoose = require('mongoose'); //  MongoDB
//mongodb+srv://cluster0.xt9zo.mongodb.net/myFirstDatabase
//mongodb://localhost/my_db
var url = 'mongodb+srv://techmevlus:0000@cluster0.xt9zo.mongodb.net/mppsc_db?retryWrites=true&w=majority';
var promise = mongoose.connect(url);

//Imports related to Payments
var crypto = require('crypto');
const https = require('https');

console.log("WORKS FINE")
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', ' * ');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers');
    //and remove cacheing so we get the most recent questions
    res.setHeader('Cache-Control', 'no-cache');
    next();
});
var router = express.Router();
var Question = require('./../models/schema.js');
var AdminCred = require('./../models/adminSchema.js');
var AuthorCred = require('./../models/authorSchema.js');
const Exam = require('../models/examCollection');


router.get('/', function(req, res) {
	res.json({ message: 'API Initialized!'});
});

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests




//Imports related to PAYTM
const Paytm = require('paytmchecksum');
var PaytmChecksum = require('./PaytmChecksum');
const {v4:uuidv4} = require('uuid')
const formidable=require('formidable')

//PAYMENT API START HERE

router.route('/PayMoney/Paym/JsCheckout')
.post(function(req, res){ console.log("HELLO PAYMENT")
/* import checksum generation utility */
const{amount,email}=req.body;
const totalAmount=JSON.stringify(amount);
console.log('DATA NEW FORMAT', totalAmount, email)

var paytmParams = {};
var txid = ""

paytmParams.body = {
    "requestType"   : "Payment",
    "mid"           : "KChIQO91665523732785",
    "websiteName"   : "WEBSTAGING",
    "orderId"       : uuidv4(),
    "callbackUrl"   : "http://localhost:3000/api/callback",
    "txnAmount"     : {
        "value"     : totalAmount,
        "currency"  : "INR",
    },
    "userInfo"      : {
        "custId"    : "CUST_001",
    },
};
/*
* Generate checksum by parameters we have in body
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "o_iKkHNlRSCGOXpu").then(function(checksum){

	    paytmParams.head = {
	        "signature"    : checksum
	    };
	
	    var post_data = JSON.stringify(paytmParams);

	
	    var options = {
	
	        /* for Staging */
	        hostname: 'securegw-stage.paytm.in',
	
	        /* for Production */
	        // hostname: 'securegw.paytm.in',
	
	        port: 443,
	        path: '/theia/api/v1/initiateTransaction?mid=KChIQO91665523732785&orderId='+paytmParams.body.orderId,
	        method: 'POST',
	        headers: {
	            'Content-Type': 'application/json',
	            'Content-Length': post_data.length
	        }
	    };
	
	    var response = "";

	    var post_req = https.request(options, function(post_res) {
	        post_res.on('data', function (chunk) {
	            response += chunk;
	        });
	
	        post_res.on('end', function(){
		txid = response
           // console.log('Response: ', paytmParams.body.txnAmount.value, paytmParams.body.orderId, JSON.parse(txid).body.txnToken );
		PayPayload = {
			amount:paytmParams.body.txnAmount.value,
			orderId:paytmParams.body.orderId,
			txnToken:JSON.parse(txid).body.txnToken 

		}
		 res.json({ PayPayload});
			
	        });
	    });

		
	    post_req.write(post_data);
	    post_req.end();
	});

			
		
	
	
});

router.route('/callback')
.post( function(req, res){
console.log("COMMING TO THIS PAGE")
const form=new formidable.IncomingForm();
res.redirect(`http://localhost:3000/team.html`)
form.parse(req,(err,fields,file)=>
{
   
paytmChecksum = fields.CHECKSUMHASH;
delete fields.CHECKSUMHASH;

var isVerifySignature = PaytmChecksum.verifySignature(fields, "jTY7cimGnOK#9pRD", paytmChecksum);
if (isVerifySignature) {


    var paytmParams = {};
    paytmParams["MID"]     = fields.MID;
    paytmParams["ORDERID"] = fields.ORDERID;
    
    /*
    * Generate checksum by parameters we have
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    PaytmChecksum.generateSignature(paytmParams, "jTY7cimGnOK#9pRD").then(function(checksum){
    
        paytmParams["CHECKSUMHASH"] = checksum;
    
        var post_data = JSON.stringify(paytmParams);
    
        var options = {
    
            /* for Staging */
            //hostname: 'securegw-stage.paytm.in',
    
            /* for Production */
             hostname: 'securegw.paytm.in',
    
            port: 443,
            path: '/order/status',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };
    
        var response = "";
        var post_req = https.request(options, function(post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });
    
            post_res.on('end', function(){
                         let result=JSON.parse(response)
                        if(result.STATUS==='TXN_SUCCESS')
                        {
							console.log("TXN_SUCCESS")
                            //store in db
                            //db.collection('payments').doc('mPDd5z0pNiInbSIIotfj').update({paymentHistory:firebase.firestore.FieldValue.arrayUnion(result)})
                            //.then(()=>console.log("Update success"))
                            //.catch(()=>console.log("Unable to update"))
                        }

                        res.redirect(`http://localhost:3000/status/${result.ORDERID}`)


            });
        });
		
        post_req.write(post_data);
        post_req.end();
    });        
 

} else {
	console.log("Checksum Mismatched");
}


})


});

//PAYMENT API ENDS HERE

//Author Signup
router.route('/authorSignup')
.post(function(req,res){
	console.log("Initiating Author Signup");

	console.log(req.body)

		var author 	    	  = new AuthorCred();
 		author.username 	  = req.body.username;
		author.password       = req.body.password;

		author.save(function(err) {
	 		if (err)
	 			res.send(err);
			res.json({ message:'Author account created successfully!' });
 		});

});

//to get only exam name
router.route('/exams_name')
.get(function(req,res){
	Exam.find({},'exam_name logo',function(err, dataFromDB) {
		if (err){
			res.send(err);
		}
		//responds with a json object of our database questions.
		res.json(dataFromDB);
		console.log(dataFromDB)
	});
});

//to get test detail
router.route('/testDetails')
.post(function(req,res){
	var examId = req.body.examId;
	console.log(examId)
	Exam.findOne({'_id':examId},'test.noq test.negt_mark test.timeof_test test.auth_id test.attempts test.dateof_create',function(err, dataFromDB) {
		if (err){
			res.send(err);
		}
		//responds with a json object of our database questions.
		res.json(dataFromDB);
		console.log(dataFromDB)
	});
});

//to get test data(for quiz)
router.route('/test')
.post(function(req,res){
	var examId = req.body.examId;
	var testId = req.body.testId;
	console.log("Exam id ="+examId);
	console.log("Test id ="+testId);
	//Exam.findOne({'_id':examId, 'test.auth_id':authorId},'test.test_data',function(err, dataFromDB) {
	Exam.findOne({'_id':examId, 'test.auth_id':testId},function(err, dataFromDB) {
		if (err){
			res.send(err);
		}
		//responds with a json object of our database questions.
		res.json(dataFromDB);
		console.log(dataFromDB)
	});
});


//Create New Exam
var fs = require('fs');
router.route('/createNewExam')
.post(function(req,res){
	console.log("Exam Creation Running");

	console.log(req.body)

		var exam 	    	  = new Exam();
 		exam.exam_name 		  = req.body.examName;
		exam.logo       = req.body.examLogo;

		exam.save(function(err) {
	 		if (err)
	 			res.send(err);
			console.log("Exam Created Successfully")
 		});

});

//Add new quiz
router.route('/createNewTest')
.post(function(req,res){
	console.log("Test Creation Running");

	const newTestData =  {
		'noq'           : req.body.noq,
		'negt_mark'     : req.body.negt_mark,
		'timeof_test'   : req.body.timeof_test,
		'dateof_create' : req.body.dateof_create,
		'auth_id'       : req.body.auth_id,
		'attempts'      : req.body.attempts,
		'test_data'		: req.body.test_data
	}

	console.log(req.body.negt_mark)
	Exam.findOneAndUpdate({'_id':req.body.examId},{$push: {'test': newTestData}}, function(err) {
		if (err){
			console.log("Query failed!");
		}else{
			console.log("Query passed!");
		}
	});
});


//User Authentication Here

//middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
	// check header or url parameters or post parameters for token
	var token = req.headers['authorization'];
	if (!token) return next(); //if no token, continue
   
	token = token.replace('Bearer ', '');
	jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
	  if (err) {
		return res.status(401).json({
		  error: true,
		  message: "Invalid user."
		});
	  } else {
		req.user = user; //set the user to req so other routes can use it
		next();
	  }
	});
  });
   
   
  // request handlers
  app.get('/', (req, res) => {
	if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
	res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
  });

  
  // validate the admin credentials
  app.post('/admin/signin', function (req, res) {

	const user = req.body.username;
	const pwd = req.body.password;

	AdminCred.findOne({'username':user},'username password',function(err,userData){
		if(err){
			res.send(err);
		}
	
		// return 400 status if username/password is not exist
		if (!user || !pwd) {
			return res.status(400).json({
			error: true,
			message: "Username or Password required."
			});
		}
		
		// return 401 status if the credential is not match.
		if (user !== userData.username || pwd !== userData.password) {
			return res.status(401).json({
			error: true,
			message: "Username or Password is Wrong.",
			});
		}
		// generate token
		const token = utils.generateToken(userData);
		// get basic user details
		const userObj = utils.getCleanUser(userData);
		// return the token along with user details
		return res.json({ user: userObj, token });
	});
	
  });

  // validate the author credentials
  app.post('/author/signin', function (req, res) {

	const user = req.body.username;
	const pwd = req.body.password;

	AuthorCred.findOne({'username':user},'_id username password',function(err,userData){
		if(err){
			res.send(err);
		}
	
		// return 400 status if username/password is not exist
		if (!user || !pwd) {
			return res.status(400).json({
			error: true,
			message: "Username or Password required."
			});
		}
		
		// return 401 status if the credential is not match.
		if (user !== userData.username || pwd !== userData.password) {
			return res.status(401).json({
			error: true,
			message: "Username or Password is Wrong.",
			});
		}
		// generate token
		const token = utils.generateToken(userData);
		// get basic user details
		const userObj = utils.getCleanUser(userData);
		// return the token along with user details
		return res.json({ user: userObj, token });
	});
	
  });
   
   
  // verify the token and return it if it's valid
  app.get('/verifyToken', function (req, res) {
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.query.token;
	if (!token) {
	  return res.status(400).json({
		error: true,
		message: "Token is required."
	  });
	}
	// check token that was passed by decoding token using secret
	jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
	  if (err) return res.status(401).json({
		error: true,
		message: "Invalid token."
	  });
   
	  // return 401 status if the userId does not match.
	  if (user.userId !== userData.userId) {
		return res.status(401).json({
		  error: true,
		  message: "Invalid user."
		});
	  }
	  // get basic user details
	  var userObj = utils.getCleanUser(userData);
	  return res.json({ user: userObj, token });
	});
  });
	
app.listen(3001, function() {
	console.log('Api successfully running');
	
});







