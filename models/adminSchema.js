var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// creating new instance of the mongoose.schema. the schema takes an object that shows the shape of your database entries.
var adminSchema = mongoose.Schema(
	{
	    username:  	String,
	    password :  String,
	},
	{collection : "admin_cred"});
//exporting our module to use in server.js
var Cred = mongoose.model("Cred", adminSchema);
module.exports = Cred;