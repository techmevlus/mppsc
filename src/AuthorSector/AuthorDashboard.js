import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common.js';
import { Link } from 'react-router-dom'
import AuthorExam from './AuthorExam.js';
import ExamName from '../Common/ExamName.js';
import S3 from 'react-aws-s3';

 
//  <Link to="/addQuestion"><button className="marTop25 nextBtn  btn-primary">Add Question</button></Link>
// <input value="Logout" type="button"  onClick={() => this.handleLogout("Logout")}  />
  class AuthorDashboard extends React.PureComponent{

  constructor(props) {
		super(props);
    this.state = {
      selectedExam : "",
      examName     : "",
      examLogo     : null,
      exams        : [],
      imgSrc       : ""
      //examLogoName : "",
      //imageLocation: null
    }
	 
    this.handleLogout = this.handleLogout.bind(this);

	  }

   user = getUser();


	handleLogout (valClicked)
  {
    removeUserSession();
    this.props.history.push('/author-login');
  }

  handleExamName = (e) =>{
    this.setState({
      examName : e.target.value
    })
  }

  //handle input image
  handleImage = async (e) =>{
    let file = e.target.files[0];
    var imgSrc = URL.createObjectURL(event.target.files[0]);
    this.setState({
      imgSrc: imgSrc
    })
    
    if(file){
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  } 

  //set exam logo state
  _handleReaderLoaded = (readerEvent) =>{
    let binaryString = readerEvent.target.result
    this.setState({
      examLogo: btoa(binaryString)
    })
  }


  //Create new exam to database
  handleSaveExam = () =>{
    const formData = {
      examName : this.state.examName,
      examLogo : this.state.examLogo
    }
    console.log(formData)
    if(this.state.examName == null || this.state.examName == "" || this.state.examName == undefined)
      return;
    if(this.state.examLogo == null || this.state.examLogo == "" || this.state.examLogo == undefined)
      return;
    fetch('http://localhost:3001/api/createNewExam', { 
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify(formData)
        }).then(res=>{
          console.log(res)
          if(res.ok==true){
            alert("Exam Added!")
          }else{
            alert("Network Error!")
          }
        })
  }

//to fetch exam name from database
fetchExamName = () =>{
  fetch('http://localhost:3001/api/exams_name')
            .then(res => res.json())
            .then(exams => {
                this.setState({ exams })
            })
}

componentWillMount = () =>{
  this.fetchExamName();
}

//display exam logo
displayExamLogo =  (value) =>{
  console.log(value)
  return <img src={`data:image/png;base64,${value}`} width="100px" height="100px" />
}

// save exam id to local storage
savingToLocalStorage(exam_id, exam_name) {
  localStorage.setItem('exam_id', exam_id);
  localStorage.setItem('exam_name', exam_name);
}

//upload image to aws s3
/*uploadImage = async () =>{
  const config = {
    bucketName: process.env.REACT_APP_BUCKET_NAME,
    //dirName: process.env.REACT_APP_DIR_NAME, // optional
    region: process.env.REACT_APP_REGION,
    accessKeyId: process.env.REACT_APP_ACCESS_ID,
    secretAccessKey: process.env.REACT_APP_ACCESS_KEY
  };

  const ReactS3Client = new S3(config);
  var today = new Date();
  await ReactS3Client.uploadFile(this.state.examLogo, this.state.examLogoName+today.getTime()).then( data =>{
    console.log(data);
    if(data.status === "204"){
      this.setState({
        imageLocation: data.location
      })
    }
  })
}*/

render () {
  console.log(this.state)
  return (
    <div style= {{minHeight:"1000px", margin:"5px" }}>
      <button type="button" className="btn btn-danger" onClick={() => this.handleLogout("Logout")}  >Logout</button>


      <hr style={{height:"5px"}}></hr>
      {/*<ExamName url='http://localhost:3001/api/exams_name'></ExamName>*/}
    
      <ul>
        {this.state.exams.map((item, index) => (
          <Link to="AvailableTests"><li key={index} onClick={() => this.savingToLocalStorage(item._id, item.exam_name)}>{item.exam_name}<br/>{this.displayExamLogo(item.logo)}</li></Link>
        ))}
      </ul>
      
      {/*Button trigger modal*/}
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add New Exam
      </button>

      {/*Modal*/}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create New Exam</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label>
                <input type="text" name="examName" placeholder="Type exam name" onChange={this.handleExamName}/>
              </label>
              <label>
                <input type="file" name="examLogo" accept="image/png" onChange={this.handleImage}/>
              </label>
              <img src={this.state.imgSrc} /><br/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onClick={this.handleSaveExam} data-bs-dismiss="modal">Save Exam</button>
            </div>
          </div>
        </div>
      </div>


      

    </div>
  );}
}
 
export default AuthorDashboard;