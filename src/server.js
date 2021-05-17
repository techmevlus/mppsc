var express = require('express');
var app = express();

var bodyParser = require('body-parser'); //BODY Parser - lets us use the req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var mongoose = require('mongoose'); //  MongoDB
//mongodb+srv://cluster0.xt9zo.mongodb.net/myFirstDatabase
//mongodb://localhost/my_db
var promise = mongoose.connect('mongodb+srv://techmevlus:0000@cluster0.xt9zo.mongodb.net/mppsc_db?retryWrites=true&w=majority', {
  useMongoClient: true,




  // other options
});



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
const { collection } = require('./../models/schema.js');
const dbCollection = require('./../models/schema.js');

router.get('/', function(req, res) {
	res.json({ message: 'API Initialized!'});
});

//Use our router configuration when we call /api
app.use('/api', router);
//starts the server and listens for requests


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


	 router.route('/abc')
	 .get(function(req, res) {
	 //looks at our adminCred Schema
		 Cred.find(function(err, dataFromDB) {
			 if (err){
				 res.send(err);
			 }
			 //responds with a json object of our database questions.
			 res.json(dataFromDB);
			 console.log(dataFromDB)
		 });
	  })
	  //post new admin info to the database
	  .post(function(req, res) {
		 
		console.log("post method working...");
		var cred 		= new Cred();
		cred.username 	= "hiyu";
	    cred.password 	= "haya";
		
	   	cred.save(function(err) {
			if (err)
				res.send(err);
			//res.json({ message:'Admin successfully added!' });
			console.log(res);
		});
		console.log("ending here")
	});

const mongo = require('mongodb').MongoClient;
mongo.connect('mongodb+srv://techmevlus:0000@cluster0.xt9zo.mongodb.net/mppsc_db?retryWrites=true&w=majority', function(err, client) {
let allCollections = [];
//create client by providing database name
const db = client.db('mppsc_db');
db.listCollections().toArray(function(err, collections) {
    if(err) console.log(err);
    //iterate to each collection detail and push just name in array
    collections.forEach(eachCollectionDetails => {
        allCollections.push(eachCollectionDetails.name);
    });

	console.log(allCollections)
    //close client
	client.close();
 });
});


	
app.listen(3001, function() {
	console.log('Api successfully running');
	
});
