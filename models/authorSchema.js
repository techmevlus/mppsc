var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// creating new instance of the mongoose.schema. the schema takes an object that shows the shape of your database entries.
var authorSchema = mongoose.Schema(
	{
	    username:  	String,
	    password :  String,
	},
	{collection : "author_cred"});
//exporting our module to use in server.js
var AuthorCred = mongoose.model("AuthorCred", authorSchema);
module.exports = AuthorCred;