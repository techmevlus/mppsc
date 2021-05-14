import React, { useEffect, useState } from 'react';
import Answer from './Answer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as answerActions from '../actions/selectedAnswerActions';
import MyResult from '../QuizComponents/MyResult';
import Timer from '../QuizComponents/Timer';
class Options extends React.PureComponent{

	constructor(props) {
		super(props);
	 
		this.state = {
		  questionId: []
		};
	  }
	  
	handleClick (valClicked){
		
		
		if("clear" == valClicked){
			
			
			/*var elements = document.getElementsByName("option");
    		for (var i = 0, l = elements.length; i < l; i++)
    		{
       			if (elements[i].checked)
       				{
						console.log(elements[i].value);
        			}
    		}*/
			var ele = document.getElementsByName("option");
   			for(var i=0;i<ele.length;i++)
     			 ele[i].checked = false;
			
			if(this.state.questionId.includes(this.props.data._id)){
				this.setState({
					questionId: this.state.questionId.filter(element => element !== this.props.data._id)
					});
			}

		}else{

			/*document.getElementById("1").className = "strong options";
			document.getElementById("2").className = "strong options";
			document.getElementById("3").className = "strong options";
			document.getElementById("4").className = "strong options";*/
			
			let isCorrect = (valClicked) == this.props.data.key ? 'pass' : 'fail';
			//console.log(this.props.data.key);
			//console.log(valClicked);
			//isCorrect = isCorrect ? 'pass' : 'fail'
			console.log(isCorrect);
			//this.props.actions.selectedAnswer(isCorrect);
			
			
			document.getElementById(valClicked).checked = "true";
			
			if(!this.state.questionId.includes(this.props.data._id)){
				this.setState({
					questionId: this.state.questionId.concat(this.props.data._id)
				  });
			}
			
			//console.log(this.state.questionId.includes(this.props.data._id));
		}
	 }
	

	render () {
		let options = this.props.data.options;
		var iterator = options.values();
		var a = iterator.next().value;
		var b = iterator.next().value;
		var c = iterator.next().value;
		var d = iterator.next().value;
		 
		console.log(this.state.questionId)
        return (
            <div>
	            <div className="col-md-10">

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
						
	            </div>
				<div>
					<ul>
          				{this.state.questionId.map(item => (
            			<li key={item}>{item}</li>
          				))}
        			</ul>
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