var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// creating new instance of the mongoose.schema. the schema takes an object that shows the shape of your database entries.
var examCollectionSchema = mongoose.Schema(
	{
	    exam_name:  	String,
	    logo     :  	Buffer,
	    test	 : 	    [{
                            noq          : Number,
                            negt_mark    : String,
                            timeof_test  : Number,
                            dateof_create: Date,
                            auth_id      : String,
                            attempts     : Number,
                            test_data    : Array
                        }]
	},
	{collection : 'exam_collection'});


//exporting our module to use in server.js
var Exam = mongoose.model("Exam", examCollectionSchema);
module.exports = Exam;
