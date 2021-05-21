import React, { useEffect, useState } from 'react';
import Answer from './Answer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as answerActions from '../actions/selectedAnswerActions';
import MyResult from '../QuizComponents/MyResult';
import Timer from '../QuizComponents/Timer';
import { Link } from 'react-router-dom';

class Options extends React.PureComponent{

	constructor(props) {
		super(props);
	 
		this.state = {
		  resultData: [/*{
			  questionId: "",
			  answerKey: "",
			  selectedOption: ""
		  }*/],
		  correctAnswer: 0
		};
	  }


	  
	handleClick (valClicked){
		
		
		if("clear" == valClicked){
			
			//to clear radio button
			var ele = document.getElementsByName("option");
   			for(var i=0;i<ele.length;i++)
     			 ele[i].checked = false;
			
			//Match and delete array element.

			let arr = [...this.state.resultData];

			let a = arr.filter((e)=>{
				if(e.questionId == this.props.data._id){
				  return e;
				}
			  })
		  
			  if(a.length > 0){
				let a = arr.filter((e) => {
					if (e.questionId != this.props.data._id) {
					  return e;
					}
				  });
				  this.setState({
					resultData:a
				  })
			  }

		}else if("submitQuiz" == valClicked){ // Submit Quiz button

			document.getElementById("testCompleted").style.display="block";
			document.getElementById("testIncomplete").style.display="none";
			document.getElementById("quizQuestion").style.display="none";
			document.getElementById("quizTimer").style.display="none";
    		document.getElementById("testCompleteMsg").style.display="block";

		}else{
			
			let isCorrect = (valClicked) == this.props.data.key ? 'pass' : 'fail';
			//console.log(this.props.data.key);
			//console.log(valClicked);
			//isCorrect = isCorrect ? 'pass' : 'fail'
			console.log(isCorrect);
			//this.props.actions.selectedAnswer(isCorrect);
			
			
			document.getElementById(valClicked).checked = "true";
			
			//Match and add array element.

			let arr = [...this.state.resultData];
			
			let a = arr.filter((e)=>{
				if(e.questionId == this.props.data._id){
				  return e;
				}
			  })
		  
			  if(a.length > 0){
				  // Update Radio button. Selection Changed
					this.setState(prevState => ({
						resultData: prevState.resultData.map(
						obj => (obj.questionId === this.props.data._id ? Object.assign(obj, { selectedOption: valClicked }) : obj)
					  )
					}));
			  }else{
				  // Add data into array
				arr.push({
					questionId:this.props.data._id,
					answerKey:this.props.data.key,
					selectedOption: valClicked
				  });
				  this.setState({
					resultData:arr
				  });
			  }
			
		}
	 }
	
	 quizResultRadioButton(){
		 let a = 0;
		 let count = 0;
		
		for(let i = 0;i<this.state.resultData.length;i++){
			
			// Counting total number of correct answer
			
			if(this.state.resultData[i].answerKey == this.state.resultData[i].selectedOption){
				a = a + 1 ;
			}
			
			//Check if question already attempted
			
			if(this.state.resultData[i].questionId==this.props.data._id){
				console.log("Question already attempted");
				var ele = document.getElementById(this.state.resultData[i].selectedOption);
				ele.checked = true;
				count = 1;
			}
		}	

		this.setState({
			correctAnswer : a
		  });

		//clear radio button if Question already not attempted 
		
		if(count==0){
			var ele = document.getElementsByName("option");
			for(var i=0;i<ele.length;i++)
				ele[i].checked = false;
		}
		
	}

	render () {
		let options = this.props.data.options;
		var iterator = options.values();
		var a = iterator.next().value;
		var b = iterator.next().value;
		var c = iterator.next().value;
		var d = iterator.next().value;
		 
		console.log(this.state.resultData)
		console.log(this.state.resultData.length)
		console.log(this.state.correctAnswer)
		this.quizResultRadioButton();
        return (
            <div>
	            <div className="col-md-10"  id="testIncomplete" style={{displey:"block"}}>

						<div  className="strong options"  id="1" >
	                    	<h4> 
								<input type="radio" name="option" id="1" value="1" onClick={() => this.handleClick("1")}/>
								<label> &nbsp;&nbsp; 1. {a} </label>
							</h4>
	                    </div>

						<div  className="strong options" >
	                    	<h4> 
								<input type="radio" name="option" id="2" value="2" onClick={() => this.handleClick("2")}/>
								<label> &nbsp;&nbsp; 2. {b} </label>
							</h4>
	                    </div>

						<div  className="strong options" >
	                    	<h4> 
								<input type="radio" name="option" id="3" value="3" onClick={() => this.handleClick("3")}/>
								<label> &nbsp;&nbsp; 3. {c} </label>
							</h4>
	                    </div>

						<div  className="strong options" >
	                    	<h4> 
								<input type="radio" name="option" id="4" value="4" onClick={() => this.handleClick("4")} />
								<label>  &nbsp;&nbsp; 4. {d} </label>
							</h4>
	                    </div>
						<button onClick={() => this.handleClick("clear")} className="marTop25 nextBtn btn pull-left">Clear</button>
						<Link to="/quiz.html"><button className="marTop25 nextBtn btn pull-right">Next Question</button></Link>
						<Link to="/quiz.html"><button className="marTop25 nextBtn btn pull-right" onClick={() => this.handleClick("submitQuiz")}>Submit</button></Link>
						
	            </div>
				<div>
					{/*<ul>
          				{this.state.resultData.map(item => (
            			<li>{item.questionId}, {item.answerKey}</li>
          				))}
						  </ul>*/}
				</div>
				<div id="testCompleted" style={{display:"none"}}>
					<h6>Total Attempted Question : {this.state.resultData.length}</h6>
					<h6>Your Score : {this.state.correctAnswer}</h6>
				</div>
            </div>
        )
	}
}

function mapStateToProps(state, ownProps){
    return {
        bgClass : state.selectedAnswerReducer.bgClass
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(answerActions , dispatch)
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Options); 