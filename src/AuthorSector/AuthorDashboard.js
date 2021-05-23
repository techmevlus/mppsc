import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common.js';
import { Link } from 'react-router-dom'
import AuthorExam from './AuthorExam.js';
 
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
    this.handleChange = this.handleChange.bind(this);
    console.log("selectedExam", this.state.selectedExam)

	  }

   user = getUser();
 
   handleClick (valClicked)
   {
     console.log("valClicked = "+valClicked);
     if (valClicked === "exam"){
      fetch(this.props.url)
        .then(res => res.json())
        .then(exams=>{
            this.setState({ exams });
            console.log("EXAMS",this.state.exams)
        })
     }


      if (valClicked === "test")
      {
        console.log("ENTERING TEST MODE")
      }



      if (valClicked === "Next")
      {
        console.log("selected Exam", this.state.selectedExam )
        this.props.history.push({
          pathname: '/author-exam',
          //selectedExam: { _id: this.state.selectedExam}
          state: { _id:this.state.selectedExam }
        })
      }
   }
   
  
   handleChange(event) {
    this.setState({selectedExam:event.target.value});
   
  }



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
<button type="button" class="btn btn-primary" onClick={() => this.handleClick("exam")} data-toggle="modal" data-target="#exampleModalLong">
  Create Content
</button>


<div class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Popular Examinations</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">

        <section>
            <div onClick={() => this.handleClick("test", this.state.exams[0].id)}><h3   >{(this.state.exams[0]!==undefined)?this.state.exams[0].exam_name :"Exams Comming Soon" }</h3></div>
            <p>{(this.state.exams!==undefined)?
            this.state.exams.map(item => (<li>{item.exam_name}</li>)) :"Exams Comming Soon" }</p>

        </section>
<div>
{
  (this.state.exams[0]!==undefined)?
  <div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupSelect01">EXAMS</label>
  <select class="form-select" id="inputGroupSelect01" value={this.state.selectedExam} onChange={this.handleChange} >
    <option selected>Choose...</option>
    {this.state.exams.map(item => (<option value={item._id}>{item.exam_name}</option>))}

  </select>
</div>:<div>NO EXAM</div>
       
}





</div>

 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>

        <Link     to={{
      pathname: "/author-exam",
      productdetailProps: {
       productdetail: this.state.selectedExam
      }
   }}>  
          <button type="button" class="btn btn-primary">Next</button>

   
   </Link>
      </div>
    </div>
  </div>
</div>

    </div>
  );}
}
 
export default AuthorDashboard;