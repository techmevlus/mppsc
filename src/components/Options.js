import React from 'react';
import Answer from './Answer';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as answerActions from '../actions/selectedAnswerActions';
class Options extends React.PureComponent{

	
	handleClick (valClicked){

		document.getElementById("1").className = "strong options";
		document.getElementById("2").className = "strong options";
		document.getElementById("3").className = "strong options";
		document.getElementById("4").className = "strong options";
		
		let isCorrect = (valClicked) == this.props.data.key ? 'pass' : 'fail';
		//console.log(this.props.data.key);
		//console.log(valClicked);
		//isCorrect = isCorrect ? 'pass' : 'fail'
		//console.log(isCorrect);
	    this.props.actions.selectedAnswer(isCorrect);
		
		
		document.getElementById(valClicked).className = isCorrect;
	 }
	render () {
		let options = this.props.data.options;
		var iterator = options.values();
		var a = iterator.next().value;
		var b = iterator.next().value;
		var c = iterator.next().value;
		var d = iterator.next().value;
        return (
            <div>
	            <div className="col-md-10">

						<div onClick={() => this.handleClick("1")} className="strong options"  id="1" >
	                    	<h4> 
								1. {a}
							</h4>
	                    </div>

						<div onClick={() => this.handleClick("2")} className="strong options"  id="2" >
	                    	<h4> 
								2. {b}
							</h4>
	                    </div>

						<div onClick={() => this.handleClick("3")} className="strong options"  id="3" >
	                    	<h4> 
								3. {c}
							</h4>
	                    </div>

						<div onClick={() => this.handleClick("4")} className="strong options"  id="4" >
	                    	<h4> 
								4. {d}
							</h4>
	                    </div>
	                
					
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