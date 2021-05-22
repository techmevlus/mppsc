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
var Cred = require('./../models/adminSchema.js');
const Exam = require('../models/examCollection');

router.get('/', function(req, res) {
	res.json({ message: 'API Initialized!'});
});

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests

//to get only exam name
router.route('/abc')
.get(function(req,res){
	Exam.findOne({},'exam_name logo',function(err, dataFromDB) {
		if (err){
			res.send(err);
		}
		//responds with a json object of our database questions.
		res.json(dataFromDB);
		console.log(dataFromDB)
	});
});

//to get test detail
router.route('/home')
.get(function(req,res){
	Exam.findOne({'exam_name':'MPPSC'},'test.noq test.negt_mark test.timeof_test test.auth_id test.attempts',function(err, dataFromDB) {
		if (err){
			res.send(err);
		}
		//responds with a json object of our database questions.
		res.json(dataFromDB);
		console.log(dataFromDB)
	});
});


//to get questions
router.route('/questions')
	.get(function(req, res) {
	//looks at our Question Schema
		Question.find(function(err, dataFromDB) {
			if (err){
				res.send(err);
			}
			//responds with a json object of our database questions.
			res.json(dataFromDB);
			console.log(dataFromDB)
		});
 	})
 	//post new question to the database
 	.post(function(req, res) {
		 
 		var question 		= new Question();
 		question.question 	= req.body.question;
		question.options 	= req.body.options;
		question.key 		= req.body.key;

		question.save(function(err) {
	 		if (err)
	 			res.send(err);
	 		res.json({ message:'Question successfully added!' });
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
   
   
  // validate the user credentials
  app.post('/users/signin', function (req, res) {

	const user = req.body.username;
	const pwd = req.body.password;

	Cred.findOne({'username':user},'username password',function(err,userData){
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