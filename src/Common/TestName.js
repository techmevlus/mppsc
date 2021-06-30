import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

class TestName extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      testData: "",
      examId: ""
    }
    this.loadTestDetailsFromServer = this.loadTestDetailsFromServer.bind(this);
    this.componentRefresh = this.componentRefresh.bind(this);
  }

  // to load test information from server
  loadTestDetailsFromServer() {
    console.log("In fetch test data function examId =" + this.state.examId);
    const formData = { examId: this.state.examId };
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
      .then(testData => {
        this.setState({ testData });
      })
  }

  // to set state = examId from local storage if empty
  settingExamId() {
    console.log("settingExamId funtion running");
    if (this.state.examId === "" || this.state.examId === null || this.state.examId === undefined) {
      var e = localStorage.getItem('_id');
      this.setState({
        examId: e
      })
    } else {
      console.log("Exam Id already available")
    }
  }

  // this function is called automatically before render
  async componentWillMount() {
    console.log("Component is mounting...")
    await this.settingExamId();
    this.loadTestDetailsFromServer();
  }

  // this function automatically gets called when component is destroyed
  componentWillUnmount() {
    console.log("Component is unmounting...")
  }

  //to save state to local storage
  componentRefresh() {
    console.log("componentRefresh function working")
    var data = this.state.examId;
    localStorage.setItem('_id', data);
  }

  // after render this function is called automatically. 
  componentDidMount() {
    //this will be always ready for page refresh event.
    window.addEventListener('beforeunload', this.componentRefresh);
  }

  // save exam id to local storage
  savingToLocalStorage(value) {
    localStorage.setItem('test_id', value);
    var e = "";
    for(let i = 0;i<this.state.testData.test.length;i++){
      if(this.state.testData.test[i]._id == value){
        e = i;
      }
    }
    var t = this.state.testData.test[e].timeof_test*60; 
    localStorage.setItem('timeof_test', t);
    localStorage.setItem('isTestInitiated', "0"); 
    localStorage.setItem('isTestExited', "0");
  }


  render() {console.log(this.state)
    if (this.state.testData === "" || this.state.testData === undefined || this.state.testData === null) {
      console.log("Test Data is Empty")
      return false;
    } console.log("Test Data Recieved", this.state.testData)
    console.log(this.state.testData.test);
    return <div>
      <main id="main">
      <div style={{padding:"40px"}}  class="d-flex justify-content-center" >
          <h3 >Available Mock Tests</h3>
       </div>

        <div  class=" d-flex justify-content-center   container-sm   list-group">

       
          {this.state.testData.test.map((item, index) => (
            <a  onClick={() => this.savingToLocalStorage(item._id)} class="list-group-item list-group-item-action" style={{marginBottom:"10px"}}>
           <Link style ={{color:"black"}}  to="/test" >  
           
            <div class="d-flex w-100 justify-content-between"  type="button">
              <h5 class="mb-1">{item.auth_id}&nbsp;&nbsp;</h5>
              <small class="text-muted">{  moment.utc(item.dateof_create).local().startOf('seconds').fromNow()   }  </small>
            
            </div>

            <p class="mb-1"> Questions : {item.noq}&nbsp;&nbsp; |  Negative Marking : {item.negt_mark}&nbsp;&nbsp; |  Duration : {item.timeof_test}&nbsp;&nbsp;  </p>
           <small class="text-muted">Total Visits {item.attempts}&nbsp;&nbsp;</small>
            </Link>
            </a>
          ))}
          



</div>

      </main>



    </div>
  }
}

export default TestName;