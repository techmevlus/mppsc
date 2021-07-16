import React from 'react';
import Timer from '../QuizComponents/Timer';
import { Fab } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { ToggleOff } from '@material-ui/icons';
import { Redirect } from 'react-router-dom';

//<button key={index} onClick={()=>this.panelClick(e.questionNum)} style={{backgroundColor:e.questionColor}}>{e.questionNum}</button> ON LINE NO. 377


class Test extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.testTimerId = null;
        this.state = {
            data: [],

            examId: "",
            test_id: "",
            testData: [{ options: [] }],
            resultData: "",

            timeof_test: "",
            currentQuestion: 0,

            rightAnswer: 0,
            wrongAnswer: 0,
            testResult: 0,

            questionPanel: [],
            notVisited: "",
            notAttempted: 1,
            markNotAttempted: 0,
            markAttempted: 0,
            attempted: 0,

            isFullScreen: 0
        }
        this.loadTestFromServer = this.loadTestFromServer.bind(this);
        this.componentRefresh = this.componentRefresh.bind(this);
    }

    async loadTestFromServer() {

        const formData = {
            examId: this.state.examId,
            testId: this.state.test_id
        };

        await fetch('http://localhost:3001/api/test', {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(data => {
                this.setState({ data });
            });
        var e;
        for (let i = 0; i < this.state.data.test.length; i++) {
            if (this.state.test_id == this.state.data.test[i]._id) {
                e = i;
            }
        }
        await this.setState({
            data: this.state.data.test[e]
        })
        await this.setState({
            testData: this.state.data.test_data
        });
    }

    // to set state = to persist on refresh using local storage
    async settingStates() {
        console.log("settingExamId funtion running");
        if (this.state.examId === "" || this.state.examId === null || this.state.examId === undefined) {
            var e = localStorage.getItem('_id');
            await this.setState({
                examId: e
            })
        }
        if (this.state.test_id === "" || this.state.test_id === null || this.state.test_id === undefined) {
            var e = localStorage.getItem('test_id');
            await this.setState({
                test_id: e
            })
        }
        if (this.state.timeof_test === "" || this.state.timeof_test === null || this.state.timeof_test === undefined) {
            var e = localStorage.getItem('timeof_test');
            await this.setState({
                timeof_test: e
            })
        }
    }

    // this function is called automatically before render
    async componentWillMount() {
        console.log("Component is mounting...")
        await this.settingStates();
        await this.loadTestFromServer();
        this.questionPanelFunct();
    }

    // this function automatically gets called when component is destroyed
    componentWillUnmount() {
        console.log("Component is unmounting...")
        if (this.testTimerId) {
            clearInterval(this.testTimerId);
        }
    }

    //to save state to local storage
    componentRefresh() {
        alert("component refresh working")
        localStorage.setItem('_id', this.state.examId);
        localStorage.setItem('test_id', this.state.test_id);
        localStorage.setItem('timeof_test', this.state.timeof_test);
        localStorage.setItem('currentQuestion', this.state.currentQuestion);
    }

    // after render this function is called automatically. 
    async componentDidMount() {
        this.testTimerId = setInterval(this.removeTimeTaken, 1000);
        //this will be always ready for page refresh event.
        window.addEventListener('beforeunload', this.componentRefresh);

    }

    //minus seconds taken in test
    removeTimeTaken = () => {
        this.setState({
            timeof_test: this.state.timeof_test - 1
        })
    }


    //Option Selected. radio button selected
    selectRadio(value) {

        document.getElementById(value).checked = "true";

        //Match and add array element.
        let arr = [...this.state.resultData];

        let a = arr.filter((e) => {
            if (e.questionId == this.state.currentQuestion) {
                return e;
            }
        })

        if (a.length > 0) {
            // Update Radio button. Selection Changed
            this.setState(prevState => ({
                resultData: prevState.resultData.map(
                    obj => (obj.questionId === this.state.currentQuestion ? Object.assign(obj, { selectedOption: value }) : obj)
                )
            }));
        } else {
            // Add data into array
            arr.push({
                questionId: this.state.currentQuestion,
                answerKey: this.state.testData[this.state.currentQuestion].key,
                selectedOption: value
            });
            this.setState({
                resultData: arr
            });
        }
        // Update question panel Color
        this.setState(prevState => ({
            questionPanel: prevState.questionPanel.map(
                obj => (obj.questionNum - 1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: "green" }) : obj)
            )
        }));
    }

    //Clear button function
    clearButton = () =>{

        //to clear radio button
        var ele = document.getElementsByName("option");
        for (var i = 0; i < ele.length; i++)
            ele[i].checked = false;

        //Match and delete array element.

        let arr = [...this.state.resultData];

        let a = arr.filter((e) => {
            if (e.questionId == this.state.currentQuestion) {
                return e;
            }
        })

        if (a.length > 0) {
            let a = arr.filter((e) => {
                if (e.questionId != this.state.currentQuestion) {
                    return e;
                }
            });
            this.setState({
                resultData: a
            })
        }
        // Update question panel Color
        this.setState(prevState => ({
            questionPanel: prevState.questionPanel.map(
                obj => (obj.questionNum - 1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: "red" }) : obj)
            )
        }));
    }

    //next question button
    nextButton = async () =>{
        var a = this.state.currentQuestion + 1;
        await this.setState({
            currentQuestion: a
        })

        //check if marked question
        var colorCheck = false;
        var colorValue = "";
        for (let i = 0; i < this.state.questionPanel.length; i++) {
            if (this.state.questionPanel[i].questionColor == "blue" && this.state.questionPanel[i].questionNum - 1 == this.state.currentQuestion) {
                colorCheck = 1;
                colorValue = "red";
            } else if (this.state.questionPanel[i].questionColor == "orange" && this.state.questionPanel[i].questionNum - 1 == this.state.currentQuestion) {
                colorCheck = 1;
                colorValue = "green";
            }
        }
        if (colorCheck == 1) {
            // Update question panel Color
            this.setState(prevState => ({
                questionPanel: prevState.questionPanel.map(
                    obj => (obj.questionNum - 1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: colorValue }) : obj)
                )
            }));
        }
    }

    //previews question button
    previewsButton = async () =>{
        var a = this.state.currentQuestion - 1;
        await this.setState({
            currentQuestion: a
        })

        //check if marked question
        var colorCheck = false;
        var colorValue = "";
        for (let i = 0; i < this.state.questionPanel.length; i++) {
            if (this.state.questionPanel[i].questionColor == "blue" && this.state.questionPanel[i].questionNum - 1 == this.state.currentQuestion) {
                colorCheck = 1;
                colorValue = "red";
            } else if (this.state.questionPanel[i].questionColor == "orange" && this.state.questionPanel[i].questionNum - 1 == this.state.currentQuestion) {
                colorCheck = 1;
                colorValue = "green";
            }
        }
        if (colorCheck == 1) {
            // Update question panel Color
            this.setState(prevState => ({
                questionPanel: prevState.questionPanel.map(
                    obj => (obj.questionNum - 1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: colorValue }) : obj)
                )
            }));
        }
    }

    //mark for review button
    reviewButton = () => {
        var count = 0;
        for (let i = 0; i < this.state.resultData.length; i++) {
            //Check if question already attempted			
            if (this.state.resultData[i].questionId == this.state.currentQuestion) {
                count = 1;
            }
        }

        if (count) {
            // question marked for review and eligible for evaluation
            this.setState(prevState => ({
                questionPanel: prevState.questionPanel.map(
                    obj => (obj.questionNum - 1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: "orange" }) : obj)
                )
            }));
        } else {
            // question marked for review and not eligible for evaluation
            this.setState(prevState => ({
                questionPanel: prevState.questionPanel.map(
                    obj => (obj.questionNum - 1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: "blue" }) : obj)
                )
            }));
        }
    }

    //after render update for radio button
    fetchRadioButtonHistory() {

        //if question is visited first time
        var colorCheck = false;
        var colorValue = "";
        for (let i = 0; i < this.state.questionPanel.length; i++) {
            if (this.state.questionPanel[i].questionColor == "silver" && this.state.questionPanel[i].questionNum - 1 == this.state.currentQuestion) {
                colorCheck = 1;
                colorValue = "red";
            }
        }
        if (colorCheck == 1) {
            // Update question panel Color
            this.setState(prevState => ({
                questionPanel: prevState.questionPanel.map(
                    obj => (obj.questionNum - 1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: colorValue }) : obj)
                )
            }));
        }

        //clear radio button if Question already not attempted 	
        var radioCheck = 0;
        for (let i = 0; i < this.state.resultData.length; i++) {

            //Check if question already attempted			
            if (this.state.resultData[i].questionId == this.state.currentQuestion) {
                console.log("Question already attempted");
                var ele = document.getElementById(this.state.resultData[i].selectedOption);
                ele.checked = true;
                radioCheck = 1;
            }
        }
        if (radioCheck == 0) {
            var ele = document.getElementsByName("option");
            for (var i = 0; i < ele.length; i++)
                ele[i].checked = false;
        }
    }

    //this function will calculate result
    fetchResult() {
        var rightAnswer = 0;
        var wrongAnswer = 0;
        for (let i = 0; i < this.state.resultData.length; i++) {

            // Counting total number of correct answer

            if (this.state.resultData[i].answerKey == this.state.resultData[i].selectedOption) {
                rightAnswer = rightAnswer + 1;
            } else {
                wrongAnswer = wrongAnswer + 1;
            }
        }
        this.setState({
            rightAnswer: rightAnswer
        });
        this.setState({
            wrongAnswer: wrongAnswer
        })
        var result = rightAnswer - (wrongAnswer * this.state.data.negt_mark);
        this.setState({
            testResult: result
        })
    }

    //submit test function on submit button click
    submitButton = () => {
        this.setState({
            timeof_test: 0
        })
    }

    //function for question panel
    questionPanelFunct() {
        let arr = [...this.state.questionPanel];
        for (let i = 0; i < this.state.testData.length; i++) {
            // Add data into array
            arr.push({
                questionNum: i + 1,
                questionColor: "silver"
            });
        } this.setState({
            questionPanel: arr
        });
    }

    //redirect to question by panel click
    async panelClick(value) {
        value = value - 1;
        await this.setState({
            currentQuestion: value
        })

        //check if marked question
        var colorCheck = false;
        var colorValue = "";
        for (let i = 0; i < this.state.questionPanel.length; i++) {
            if (this.state.questionPanel[i].questionColor == "blue" && this.state.questionPanel[i].questionNum - 1 == this.state.currentQuestion) {
                colorCheck = 1;
                colorValue = "red";
            } else if (this.state.questionPanel[i].questionColor == "orange" && this.state.questionPanel[i].questionNum - 1 == this.state.currentQuestion) {
                colorCheck = 1;
                colorValue = "green";
            }
        }
        if (colorCheck == 1) {
            // Update question panel Color
            this.setState(prevState => ({
                questionPanel: prevState.questionPanel.map(
                    obj => (obj.questionNum - 1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: colorValue }) : obj)
                )
            }));
        }
    }

    //updating dashboard number data
    dashboardData() {
        var colorSilver = 0;
        var colorRed = 0;
        var colorBlue = 0;
        var colorOrange = 0;
        var colorGreen = 0;

        for (let i = 0; i < this.state.questionPanel.length; i++) {
            if (this.state.questionPanel[i].questionColor == "silver") {
                colorSilver = colorSilver + 1;
            } else if (this.state.questionPanel[i].questionColor == "red") {
                colorRed = colorRed + 1;
            } else if (this.state.questionPanel[i].questionColor == "blue") {
                colorBlue = colorBlue + 1;
            } else if (this.state.questionPanel[i].questionColor == "orange") {
                colorOrange = colorOrange + 1;
            } else {
                colorGreen = colorGreen + 1;
            }
        }

        this.setState({
            notVisited: colorSilver
        })

        this.setState({
            notAttempted: colorRed
        })

        this.setState({
            markNotAttempted: colorBlue
        })

        this.setState({
            markAttempted: colorOrange
        })

        this.setState({
            attempted: colorGreen
        })
    }

    //check if question attempted or not to change color of mark review button
    checkMarkButtonColor() {
        var count = 0;
        for (let i = 0; i < this.state.resultData.length; i++) {
            if (this.state.resultData[i].questionId == this.state.currentQuestion) {
                return true;
            }
        }
        return false;
    }

    //display test analysis and explaination after test completion
    resultExplaination() {
        let arr = [];
        for (let i = 0; i < this.state.testData.length; i++) {
            arr.push(
                <div id={"explain" + i}>
                    <h5>Q.{i + 1} {this.state.testData[i].question}</h5>
                    <h6>1. {this.state.testData[i].options1}</h6>
                    <h6>2. {this.state.testData[i].options2}</h6>
                    <h6>3. {this.state.testData[i].options3}</h6>
                    <h6>4. {this.state.testData[i].options4}</h6>
                    {this.selectedAndCorrect(i)}<br />
                </div>
            );
        }
        return arr;
    }

    //check and return result data to analysis function
    selectedAndCorrect(e) {
        for (let i = 0; i < this.state.resultData.length; i++) {
            if (this.state.resultData[i].questionId == e) {
                return <div>
                    <span style={{ color: (this.state.resultData[i].selectedOption == this.state.resultData[i].answerKey) ? "green" : "red" }}>Selected Answer : {this.state.resultData[i].selectedOption}</span><br />
                    <span style={{ color: "green" }}>Correct Answer : {this.state.resultData[i].answerKey}</span><br />
                    <span style={{ fontWeight: "bold" }}>Explaination : {this.state.testData[e].explain}</span>
                </div>
            }
        }
        return <div>
            <span style={{ color: "red" }}>Selected Answer : Not Attempted</span><br />
            <span style={{ color: "green" }}>Correct Answer : {this.state.testData[e].key} </span><br />
            <span style={{ fontWeight: "bold" }}>Explaination : {this.state.testData[e].explain}</span>
        </div>
    }

    //starting fullScreen
    onFullScreen = () =>{

        this.setState({
            isFullScreen: 1
        })

        var elem = document.getElementById("test-main");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }
    //closing fullscreen
    offFullScreen = () =>{

        this.setState({
            isFullScreen: 0
        })

        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

    //show analysis
    showAnalysis() {
        document.getElementById("showAnalysis").style.display = "block";
        document.getElementById("showAnalysisButton").style.display = "none";
    }

    render() {
        if (this.state.data === "" || this.state.data === undefined || this.state.data === null) {
            console.log("test data is empty");
        } else {
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", this.state.data);
        }
        this.fetchRadioButtonHistory();
        this.fetchResult();
        this.dashboardData();


        return <div className="test-container" id="test-main">
            <div className="test-header">
                <div className="test-header-item1">
                    <span>Test ID: {this.state.test_id} </span>
                </div>
                <div className="test-header-item2">
                    {this.state.isFullScreen ? <button className="btn test-button" type="button" onClick={this.offFullScreen}>Fullscreen Off</button> : <button class="btn test-button" type="button" onClick={this.onFullScreen}>Fullscreen On</button>}
                </div>
                <div className="test-header-item3">
                    Guest User
                </div>
            </div>
            <div className="test-name">
                <span>Test Name: {this.state.test_id} </span>
            </div>
            <div className="test-content">
                <div className="test-content-item1">
                    <span>Question No. {this.state.currentQuestion + 1} / {this.state.testData.length}</span>
                </div>
                <div className="test-content-item2">
                    <span>Negative Marking: </span><span style={{color:"red"}}>{this.state.data.negt_mark}</span>
                </div>
            </div>
            <div className="test-data">
                <div className="test-data-item1">
                    <span> {this.state.testData[this.state.currentQuestion].question}</span>
                </div>
                <div className="test-data-item2">
                    <input class="form-check-input" type="radio" name="option" id="1" value="1" onClick={() => this.selectRadio("1")} />
                    <label >   &nbsp;&nbsp; (A)  {this.state.testData[this.state.currentQuestion].options1} </label>
                </div>
                <div className="test-data-item3">
                    <input class="form-check-input" type="radio" name="option" id="2" value="2" onClick={() => this.selectRadio("2")} />
                    <label> &nbsp;&nbsp; (B)  {this.state.testData[this.state.currentQuestion].options2} </label>
                </div>
                <div className="test-data-item4">
                    <input class="form-check-input" type="radio" name="option" id="3" value="3" onClick={() => this.selectRadio("3")} />
                    <label> &nbsp;&nbsp; (C)  {this.state.testData[this.state.currentQuestion].options3} </label>
                </div>
                <div className="test-data-item5">
                    <input class="form-check-input" type="radio" name="option" id="4" value="4" onClick={() => this.selectRadio("4")} />
                    <label> &nbsp;&nbsp; (E)  {this.state.testData[this.state.currentQuestion].options4} </label>
                </div>
            </div>
            <div className="test-dashboard">
                <div className="test-dashboard-item1">
                    Time Left
                </div>
                <div className="test-dashboard-item2">
                    <Timer startDate={new Date().getTime() + (this.state.timeof_test * 1000)} />
                </div>
                <div className="test-dashboard-item3">
                    Color Guide
                </div>
                <div className="test-dashboard-item4">
                    <span className="badge rounded-pill bg-secondary">{this.state.notVisited}</span>&nbsp;<span style={{ color: "silver" }}>Not Visited : Silver</span><br />
                    <span className="badge rounded-pill bg-danger">{this.state.notAttempted}</span>&nbsp;<span style={{ color: "red" }}>Not Attempted : Red</span><br />
                    <span className="badge rounded-pill bg-primary">{this.state.markNotAttempted}</span>&nbsp;<span style={{ color: "blue" }}>Marked Review &amp; Not Attempted : Blue</span><br />
                    <span className="badge rounded-pill bg-warning">{this.state.markAttempted}</span>&nbsp;<span style={{ color: "orange" }}>Marked Review &amp; Attempted : Orange</span><br />
                    <span className="badge rounded-pill bg-success">{this.state.attempted}</span>&nbsp;<span style={{ color: "green" }}>Attempted : Green</span>
                </div>
                <div className="test-dashboard-item5">
                    {this.state.questionPanel.map((e, index) => (
                        <span>
                            <Fab key={index} onClick={() => this.panelClick(e.questionNum)} style={{ backgroundColor: e.questionColor, margin: "5px", color: "white" }} aria-label={e.questionNum}>
                                {e.questionNum}
                            </Fab>

                        </span>
                    ))}
                </div>
            </div>
            <div className="test-footer">
                <div className="test-footer-item1">
                    <button className="btn test-button" type="button" onClick={this.reviewButton}>Mark &amp; Review</button>
                </div>
                <div className="test-footer-item2">
                    <button className="btn test-button" type="button" onClick={this.clearButton}>Clear</button>
                </div>
                <div className="test-footer-item3">
                    <button className="btn test-button" type="button" onClick={this.previewsButton}>Previews</button>
                </div>
                <div className="test-footer-item4">
                    <button className="btn test-button" type="button" onClick={this.nextButton}>Next</button>
                </div>
                <div className="test-footer-item5">
                    <button className="btn" type="button" onClick={this.submitButton}>Submit</button>
                </div>
            </div>
        </div>
        
        /*<div style={{ border: "2px", borderColor: "black" }}>

            <div id="test_main" style={{ display: "block", backgroundColor: "white", display: "flex", displayDirection: "column" }}>

                <div id="testIncomplete" style={{
                     display: "block",
                     position: "absolute",
                     right:"0",
                     left:"0"
                }}>
                    <div style={{
                    position: "absolute",
                    right:"0",
                    left:"0",
                    height: "50px",
                    backgroundColor: "purple",
                    fontSize: "25px",
                    color: "white"
                    }}>
                    <div style={{float: "left", marginTop: "3px", paddingLeft: "10px"}}>Test Name</div>
                    <div style={{float: "right", marginTop: "3px", paddingRight: "10px"}}>User Name</div>
                </div>


                    <div style={{ width: "68%", margin: "10px" }}>
                        <div style={{ borderRadius: "15px", padding: "40px", backgroundColor: "orange" }}>
                            <div style={{
                                position: "absolute",
                                right: "0",
                                left: "0",
                                backgroundColor: "yellow"
                            }}>
                                <div style={{float: "left", marginLeft: "10px"}}>Question: {this.state.currentQuestion + 1} / {this.state.testData.length}</div>
                                <div class="col-4" id="timer" style={{ display: "block", float: "right", marginRight: "10px" }}><Timer startDate={new Date().getTime() + (this.state.timeof_test * 1000)} /></div>
                            </div>
                            <br/>
                            <br/>
                            <div id="question" style={{ display: "block" }}><h3>Q.{this.state.currentQuestion + 1} {this.state.testData[this.state.currentQuestion].question}</h3></div>


                            <div style={{ fontSize: "20px" }}>
                                <input class="form-check-input" type="radio" name="option" id="1" value="1" onClick={() => this.selectRadio("1")} />
                                <label >   &nbsp;&nbsp; (A)  {this.state.testData[this.state.currentQuestion].options1} </label>
                            </div>
                            <div style={{ fontSize: "20px" }}>
                                <input class="form-check-input" type="radio" name="option" id="2" value="2" onClick={() => this.selectRadio("2")} />
                                <label> &nbsp;&nbsp; (B)  {this.state.testData[this.state.currentQuestion].options2} </label>
                            </div>
                            <div style={{ fontSize: "20px" }}>
                                <input class="form-check-input" type="radio" name="option" id="3" value="3" onClick={() => this.selectRadio("3")} />
                                <label> &nbsp;&nbsp; (C)  {this.state.testData[this.state.currentQuestion].options3} </label>
                            </div>
                            <div style={{ fontSize: "20px" }}>
                                <input class="form-check-input" type="radio" name="option" id="4" value="4" onClick={() => this.selectRadio("4")} />
                                <label> &nbsp;&nbsp; (E)  {this.state.testData[this.state.currentQuestion].options4} </label>

                            </div>


                        </div>
                        <div style={{ marginTop: "150px", textAlign: "left" }} class="d-grid gap-2  d-md-block  ">

                            {
                                (this.state.currentQuestion !== 0) ? <button style={{ marginRight: "10px" }} type="button" class="btn btn-outline-dark" onClick={() => this.previewsButton()}> Previews Question</button> : ""

                            }
                            {
                                (this.state.currentQuestion + 1 !== this.state.testData.length) ? <button style={{ marginRight: "10px" }} type="button" class="btn btn-outline-dark" onClick={() => this.nextButton()}>Next Question</button> : ""

                            }
                            <button style={{ marginRight: "10px" }} type="button" class="btn btn-outline-danger" onClick={() => this.clearButton()}>Clear Response</button>
                            <button style={{ marginRight: "10px" }} type="button" className={this.checkMarkButtonColor() ? "btn btn-outline-warning" : "btn btn-outline-primary"} onClick={() => this.reviewButton()}>Mark Review</button>

                            <button style={{ marginRight: "10px" }} onClick={this.submitButton} type="button" class="btn btn-primary">
                                Submit Test
                            </button>

                            <button style={{ marginRight: "10px" }} class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">DASHBOARD</button>
                            {this.state.isFullScreen ? <button style={{ marginRight: "10px" }} class="btn btn-primary" type="button" onClick={this.offFullScreen}>Fullscreen Off</button> : <button style={{ marginRight: "10px" }} class="btn btn-primary" type="button" onClick={this.onFullScreen}>Fullscreen On</button>}
                        </div>


                    </div>



                </div>


                <div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
                    <div class="offcanvas-header">
                        <div style={{ padding: "20px" }} class="row">
                            <div class="col-4" id="timer" style={{ display: "block" }}><Timer startDate={new Date().getTime() + (this.state.timeof_test * 1000)} /></div>
                            <div class="col-8 d-flex flex-row-reverse">  <span id="testHeading">Test ID <br></br>{this.state.test_id}</span></div>
                            <hr></hr>

                        </div>

                        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div class="offcanvas-body">


                        <h6 style={{}} class="offcanvas-footer" id="offcanvasScrollingLabel">
                            <span className="badge rounded-pill bg-secondary">{this.state.notVisited}</span>&nbsp;<span style={{ color: "silver" }}>Not Visited : Silver</span><br />
                            <span className="badge rounded-pill bg-danger">{this.state.notAttempted}</span>&nbsp;<span style={{ color: "red" }}>Not Attempted : Red</span><br />
                            <span className="badge rounded-pill bg-primary">{this.state.markNotAttempted}</span>&nbsp;<span style={{ color: "blue" }}>Marked Review &amp; Not Attempted : Blue</span><br />
                            <span className="badge rounded-pill bg-warning">{this.state.markAttempted}</span>&nbsp;<span style={{ color: "orange" }}>Marked Review &amp; Attempted : Orange</span><br />
                            <span className="badge rounded-pill bg-success">{this.state.attempted}</span>&nbsp;<span style={{ color: "green" }}>Attempted : Green</span>
                        </h6>
                        <hr></hr>
                        <br></br>
                        <div>





                            {this.state.questionPanel.map((e, index) => (
                                <span>
                                    <Fab key={index} onClick={() => this.panelClick(e.questionNum)} style={{ backgroundColor: e.questionColor, margin: "5px", color: "white" }} aria-label={e.questionNum}>{e.questionNum}

                                    </Fab>

                                </span>
                            ))}

                        </div>
                        <hr></hr>



                    </div>
                </div>




                <div class="alert alert-success" role="alert" id="testCompleted" style={{ display: "none" }}>
                    <span><h4 class="alert-heading">Exam Completed <CheckCircleIcon style={{ color: "blue", size: "20px" }}> </CheckCircleIcon></h4> </span>
                    <hr />
                    <table style={{ border: "1px solid black" }}>
                        <tr style={{ border: "1px solid black" }}>
                            <td style={{ border: "1px solid black" }}>Total Question</td>
                            <td style={{ border: "1px solid black" }}>{this.state.testData.length}</td>
                        </tr>
                        <tr style={{ border: "1px solid black" }}>
                            <td style={{ border: "1px solid black" }}>Attempted Question</td>
                            <td style={{ border: "1px solid black" }}>{this.state.resultData.length}</td>
                        </tr>
                        <tr style={{ border: "1px solid black" }}>
                            <td style={{ border: "1px solid black" }}>Right Answer</td>
                            <td style={{ border: "1px solid black" }}>{this.state.rightAnswer}</td>
                        </tr>
                        <tr style={{ border: "1px solid black" }}>
                            <td style={{ border: "1px solid black" }}>Wrong Answer</td>
                            <td style={{ border: "1px solid black" }}>{this.state.wrongAnswer}</td>
                        </tr>
                        <tr style={{ border: "1px solid black" }}>
                            <td style={{ border: "1px solid black" }}>Test Marks</td>
                            <td style={{ border: "1px solid black" }}>{this.state.testResult}</td>
                        </tr>
                    </table>
                    <hr />
                    <button type="button" class="btn btn-success" id="showAnalysisButton" onClick={this.showAnalysis}>Show Analysis</button>&nbsp;
                    {this.state.isFullScreen ? <button type="button" class="btn btn-success" onClick={this.offFullScreen}>Off Fullscreen</button> : ""}
                    <div id="showAnalysis" style={{ display: "none" }}>{this.resultExplaination()}</div>
                </div>
            </div>
        </div>*/
    }
}

export default Test;