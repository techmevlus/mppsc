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

//Create New Exam
router.route('/')
.post(function(req,res){
	console.log("Exam Creation Running");
	
	var exam       = new Exam();
	exam.exam_name = "VYAPAM";

	exam.save(function(err){
		if(err){
			res.send(err);
		}
		else console.log("Exam Successfully Created");
	})
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

	AuthorCred.findOne({'username':user},'username password',function(err,userData){
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