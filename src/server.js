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


//Imports related to Payments
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname);


//PAYMENT API START HERE



router.route('/PayMoney')
.post(function(req, res){ console.log("HELLO PAYMENT")
console.log("req data is coming to the srver", req.body)
	var strdat = req.body;
	console.log("payment data is coming to the srver")
	
		var ord = JSON.stringify(Math.random()*1000);
		var i = ord.indexOf('.');
		ord = 'ORD'+ ord.substr(0,i);

		
		console.log("payment data is coming to the srver", strdat)
		var cryp = crypto.createHash('sha512');

		console.log("trnsaction crypcrypcryp", cryp)
		var text = strdat.key+'|'+ord+'|'+strdat.amount+'|'+strdat.pinfo+'|'+strdat.fname+'|'+strdat.email+'|||||'+strdat.udf5+'||||||'+strdat.salt;
		console.log("trnsaction text", text);
		cryp.update(text);
		console.log("trnsaction cryp", cryp);
		var hash = cryp.digest('hex');	
		console.log("PRIVATE CODE",JSON.stringify(hash) )
		return res.json({ hash, ord });	
				
		
	
	
});

router.route('/response.html')
.post( function(req, res){
	console.log("INSIDE RESPONSE API")
	var key = req.body.key;
	var salt = req.body.salt;
	var txnid = req.body.txnid;
	var amount = req.body.amount;
	var productinfo = req.body.productinfo;
	var firstname = req.body.firstname;
	var email = req.body.email;
	var udf5 = req.body.udf5;
	var mihpayid = req.body.mihpayid;
	var status = req.body.status;
	var resphash = req.body.hash;
	
	var keyString 		=  	key+'|'+txnid+'|'+amount+'|'+productinfo+'|'+firstname+'|'+email+'|||||'+udf5+'|||||';
	var keyArray 		= 	keyString.split('|');
	var reverseKeyArray	= 	keyArray.reverse();
	var reverseKeyString=	salt+'|'+status+'|'+reverseKeyArray.join('|');
	
	var cryp = crypto.createHash('sha512');	
	cryp.update(reverseKeyString);
	var calchash = cryp.digest('hex');
	
	var msg = 'Payment failed for Hash not verified...';
	if(calchash == resphash)
		msg = 'Transaction Successful and Hash Verified...';
	
	res.render(__dirname + '/response.html', {key: key,salt: salt,txnid: txnid,amount: amount, productinfo: productinfo, 
	firstname: firstname, email: email, mihpayid : mihpayid, status: status,resphash: resphash,msg:msg});
});

//PAYMENT API ENDS HERE

//to get only exam name
router.route('/exams_name')
.get(function(req,res){
	Exam.find({},'exam_name',function(err, dataFromDB) {
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