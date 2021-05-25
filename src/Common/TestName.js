import React from 'react';

class TestName extends React.PureComponent{
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	testData: ""
	    }
      this.loadTestDetailsFromServer = this.loadTestDetailsFromServer.bind(this);
	}

  

loadTestDetailsFromServer(){
  const formData =  {    examId   : "60a787bdd03c9462c79735fe"  };
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
                  attempts = {item.attempts}&nbsp;&nbsp;
                </li>))}</ul>}
                </p>

    </main>



	            </div>; 
	}
}

export default TestName;