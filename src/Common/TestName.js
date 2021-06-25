import React from 'react';
import { Link } from 'react-router-dom';

class TestName extends React.PureComponent {
  constructor(props, context) {
    super(props, context);
    this.state = {
      testData: "",
      examId: "",
      selectedTest: "",
      timeof_test: ""
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
    var e = this.state.timeof_test*60;
    localStorage.setItem('timeof_test', e); 
    modal('toggle')
  }
  SetTestId(value) {
    this.setState({
      selectedTest: value
    })
    var e = "";
    for(let i = 0;i<this.state.testData.test.length;i++){
      if(this.state.testData.test[i]._id == value){
        e = i;
      }
    }
    this.setState({
      timeof_test: this.state.testData.test[e].timeof_test
    })
  }


  render() {console.log(this.state)
    if (this.state.testData === "" || this.state.testData === undefined || this.state.testData === null) {
      console.log("Test Data is Empty")
      return false;
    } console.log("Test Data Recieved")
    console.log(this.state.testData.test);
    return <div>
      <main id="main">
        <p>

          {<ul>{this.state.testData.test.map((item, index) => (
            <li onClick={() => this.SetTestId(item._id)} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              noq = {item.noq}&nbsp;&nbsp;
              negt_mark = {item.negt_mark}&nbsp;&nbsp;
              timeof_test = {item.timeof_test}&nbsp;&nbsp;
              auth_id = {item.auth_id}&nbsp;&nbsp;
              attempts = {item.attempts}&nbsp;&nbsp;
              <span style={{ fontSize: "20px" }} class="badge rounded-pill bg-warning text-dark">Take Test</span>
            </li>
          ))}</ul>}
        </p>







        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div class="modal-dialog modal-fullscreen">
            <div class="modal-content">
              <div style={{ backgroundColor: "green", color: 'white' }} class="modal-header">
                <h5 class="modal-title" id="staticBackdropLabel">Exam Instructions</h5>
                <p>Kuldeep</p>
              </div>
              <div class="modal-body">
                <span>
                  SUBJECT NAME and SUBJECT NUMBER <br></br>

                  Assessment Task X – Take Home Examination <br></br>

                  Insert Session and year e.g. Autumn 2020 <br></br>

                  Instructions <br></br>

                  This examination is made available online at TIME on DATE.  <br></br>

                  Your completed answer file is due at TIME on DATE and must be submitted online via the xx link Assignments folder on Blackboard/Canvas.  <br></br>

                  There are X questions. Your answer to each question attempted should commence on a new page and be appropriately numbered.  <br></br>

                  The examination is worth X% of the marks available in this subject. The contribution each question makes to the total examination mark is indicated in marks or as a percentage.  <br></br>

                  This examination is an open book examination. <br></br>

                  This examination is expected to take approximately 2 hours [3 if an exception] of working time. You are advised to allocate your time accordingly. Your answer file may be submitted at any time before the due time. Please allow time to complete the submission process. <br></br>

                  Please submit your file in PDF/Word etc format unless directed otherwise. Please name your file as follows:  <br></br>

                  EXAM_subject number_student number   e.g. EXAM_54000_12345678 <br></br>

                  Word Limit <br></br>

                  There is a word limit for each question. Footnotes/references are not included in the word count. The most important thing is to answer the question in a succinct manner. This means that your answer can consist of a word count less than the imposed word limit. A ten percent (10%) leeway on word counts is permitted. <br></br>

                  Footnotes/references must be used for citation purposes only and not for the development of your arguments. A bibliography is not required for this assessment task.  <br></br>

                  Important Notice – Exam Conditions and Academic Integrity <br></br>

                  In attempting this examination and submitting an answer file, candidates are undertaking that the work they submit is a result of their own unaided efforts and that they have not discussed the questions or possible answers with other persons during the examination period. Candidates who are found to have participated in any form of cooperation or collusion or any activity which could amount to academic misconduct in the answering of this examination will have their marks withdrawn and disciplinary action will be initiated on a complaint from the Examiner.  <br></br>
                </span>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">   Cancel   </button>
                <Link to="/Test" onClick={() => this.savingToLocalStorage(this.state.selectedTest)} > <button type="button" class="btn btn-success">   I am Ready   </button> </Link>
              </div>
            </div>
          </div>
        </div>



      </main>



    </div>
  }
}

export default TestName;