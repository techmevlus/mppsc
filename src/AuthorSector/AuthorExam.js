import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common.js';
import { Link } from 'react-router-dom'
 
//  <Link to="/addQuestion"><button className="marTop25 nextBtn  btn-primary">Add Question</button></Link>
// <input value="Logout" type="button"  onClick={() => this.handleLogout("Logout")}  />
  class AuthorExam extends React.PureComponent{




  constructor(props) {
		super(props);
    this.state = {
      exams:"",
      selectedtest :"" 

    }
	 
    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    console.log("selectedtest", this.state.selectedtest)

	  }

   user = getUser();
 
   handleClick (valClicked)
   {
     if (valClicked === "exam")
     {		fetch(this.props.url)
			.then(res => res.json())
			.then(exams=>{
		    	this.setState({ exams });
          console.log("EXAMS",this.state.exams[0])
			})}


      if (valClicked === "test")
      {
        console.log("ENTERING TEST MODE")
      }



      if (valClicked === "Next")
      {
        console.log("selected Exam", this.state.selectedtest )
        this.props.history.push({
          pathname: '/author-exam',
          selectedtest: { _id: this.state.selectedtest}
        })


      }
   }
   
  
   handleChange(event) {
    this.setState({selectedtest:event.target.value});
   
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
            <p>{(this.state.exams[0]!==undefined)?this.state.exams[0].test[0].noq :"Exams Comming Soon" }</p>

        </section>
<div>
{
  (this.state.exams[0]!==undefined)?
  <div class="input-group mb-3">
  <label class="input-group-text" for="inputGroupSelect01">EXAMS</label>
  <select class="form-select" id="inputGroupSelect01" value={this.state.selectedtest} onChange={this.handleChange} >
    <option selected>Choose...</option>
    <option value={this.state.exams[0]._id}>{this.state.exams[0].exam_name}</option>
    <option value={this.state.exams[0]._id}>{this.state.exams[0].exam_name}</option>

  </select>
</div>:<div>NO EXAM</div>
       
}





</div>

 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button  onClick={() => this.handleClick("Next", this.state.selectedtest)}   type="button" class="btn btn-primary">Next</button>
      </div>
    </div>
  </div>
</div>

    </div>
  );}
}
 
export default AuthorExam;