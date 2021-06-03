import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
let data = require('../data'); //this imports data from local file, pass it as a prop to Quiz component



class AuthorExam extends React.PureComponent{
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	testData: ""
	    }
      this.loadTestDetailsFromServer = this.loadTestDetailsFromServer.bind(this);
	}

  

loadTestDetailsFromServer(){
  console.log(this.props.location.selectedExam);
  const formData =  {    examId   : this.props.location.selectedExam  };
   // fetch('http://localhost:3001/api/testDetails')
   fetch('http://localhost:3001/api/testDetails', { 
    method: 'post',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
        
    },
    body: JSON.stringify(formData)
  })
  .then(res => res.json())
  .then(testData=>{
      this.setState({ testData });
  })
}

componentWillMount(){
  this.loadTestDetailsFromServer();
}
	
	render () {  console.log("DATA IS COMMING", this.props.location.selectedExam)
            if(this.state.testData==="" || this.state.testData===undefined || this.state.testData===null){
              console.log("Test Data is Empty")
            return false;
            } console.log("Test Data Recieved")
            console.log(this.state.testData.test);
        return 	 <div> 
              <main id="main">
                <p>
                 
                {<ul>{this.state.testData.test.map((item ,index)=> (<li key={index}>
                  noq = {item.noq}&nbsp;&nbsp;
                  negt_mark = {item.negt_mark}&nbsp;&nbsp;
                  timeof_test = {item.timeof_test}&nbsp;&nbsp;
                  auth_id = {item.auth_id}&nbsp;&nbsp;
                  attempts = {item.attempts}
                </li>))}</ul>}
                </p>

    </main>



	            </div>; 
	}
}


AuthorExam.PropTypes = {
	books: PropTypes.bool.isRequired,
 }
 /*Book.PropTypes = {
 	b: PropTypes.string
 }
*/
export default AuthorExam;