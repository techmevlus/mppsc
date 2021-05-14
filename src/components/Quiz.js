import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Question from './Question.js';
import Options from './Options.js';
import Timer from '../QuizComponents/Timer';
//import MyResult from '../QuizComponents/MyResult';
let data = require('../data'); //this imports data from local file, pass it as a prop to Quiz component

const shuffleArray = array => {
	let i = array.length - 1;
	for (; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

const startDate = new Date().getTime() + 31536000000;

class Quiz extends React.PureComponent{
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	data:""
	    }
		this.loadQuestionsFromServer = this.loadQuestionsFromServer.bind(this);
	}
	loadQuestionsFromServer() {
		fetch(this.props.url)
			.then(res => res.json())
			.then(data=>{
		    	this.setState({ data });
			})
    }
	

	componentWillMount() {
		this.loadQuestionsFromServer();
    }

	resetOption() {
		var ele = document.getElementsByName("option");
   			for(var i=0;i<ele.length;i++)
     			 ele[i].checked = false;
	}

	  
	
	render () {  console.log("product props is", this.props.location.productdetailProps);
		if(this.state.data==="" || this.state.data===undefined || this.state.data===null){
    		console.log("hello")
			return false;
    	} console.log("hello 2")
		var shuffledPosts = shuffleArray(this.state.data);
		return <div> 
			<div className="row posRelative">
			
			<Timer startDate={startDate} />
			
				<div className="col-md-10">
					<Question data={shuffledPosts[0].question} />
				</div>
					<Options data={(shuffledPosts[0])} />
			</div>
			<div className="col-md-10 noPad">
				<Link to="/quiz.html"><button className="marTop25 nextBtn btn pull-right" onClick={this.resetOption}>Next Question</button></Link>
				<Link to="/addQuestion"><button className="marTop25 nextBtn btn pull-left">Add Question</button></Link>
			</div>
			<Link to="/adminLogin"><button className="marTop25 nextBtn btn pull-left">Admin Page</button></Link>
			
		</div>; 
	}
}


 Quiz.PropTypes = {
	books: PropTypes.bool.isRequired,
 }
 /*Book.PropTypes = {
 	b: PropTypes.string
 }
*/
export default Quiz;