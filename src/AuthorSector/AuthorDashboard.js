import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common.js';
import { Link } from 'react-router-dom'
import AuthorExam from './AuthorExam.js';
import ExamName from '../Common/ExamName.js'
 
//  <Link to="/addQuestion"><button className="marTop25 nextBtn  btn-primary">Add Question</button></Link>
// <input value="Logout" type="button"  onClick={() => this.handleLogout("Logout")}  />
  class AuthorDashboard extends React.PureComponent{




  constructor(props) {
		super(props);
    this.state = {
      exams:[],
      selectedExam :"" 

    }
	 
    this.handleLogout = this.handleLogout.bind(this);

	  }

   user = getUser();


	handleLogout (valClicked)
  {
    removeUserSession();
    this.props.history.push('/author-login');
  }



render () {
 
  return (
    <div style= {{minHeight:"1000px", margin:"5px" }}>
    
      <button type="button" class="btn btn-danger" onClick={() => this.handleLogout("Logout")}  >Logout</button>


      <hr style={{height:"5px"}}></hr>
      <ExamName url='http://localhost:3001/api/exams_name'></ExamName>












    </div>
  );}
}
 
export default AuthorDashboard;