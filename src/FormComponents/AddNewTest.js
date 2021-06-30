import React from 'react';
import moment from 'moment';

class AddNewTest extends React.PureComponent{

    constructor(props, context){
        super(props, context);
        this.state = {
            noq          : 0,
            negt_mark    : "none",
            timeof_test  : 5,
            auth_id      : "",
            attempts     : 0,
            test_data    : [],
            exams        : [],
            examId       : "",
            examName     : ""
        }
        this.loadExamNameFromServer = this.loadExamNameFromServer.bind(this);
        this.handleNoq = this.handleNoq.bind(this);
        this.handleTimeof_test = this.handleTimeof_test.bind(this);
        this.handleNegt_mark = this.handleNegt_mark.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleQuestion = this.handleQuestion.bind(this);
        this.handleOptions1 = this.handleOptions1.bind(this);
        this.handleOptions2 = this.handleOptions2.bind(this);
        this.handleOptions3 = this.handleOptions3.bind(this);
        this.handleOptions4 = this.handleOptions4.bind(this);
        this.handleExplain = this.handleExplain.bind(this);
        this.handleKey = this.handleKey.bind(this);
        this.handleExamSelection = this.handleExamSelection.bind(this);
        this.handlePostTest = this.handlePostTest.bind(this);
    }

    // loads data from server
    loadExamNameFromServer() {
        fetch('http://localhost:3001/api/exams_name')
            .then(res => res.json())
            .then(exams => {
                this.setState({ exams })
            })
    }

    //Update number of questions
    handleNoq(e){
        this.setState({
            noq : e.target.value
        });
    }

    //update test duration
    handleTimeof_test(e){
        this.setState({
            timeof_test : e.target.value
        });
    }

    //update negative marking
    handleNegt_mark(e){
        this.setState({
            negt_mark: e.target.value
        })
    }

    //on submitting test information
    handleSubmit(e){
        document.getElementById("test").style.display = "none";
        document.getElementById("testData").style.display = "block";
        e.preventDefault();
    }

    //Dynamically create Question Form
    createQuestionForm(){
        let QuestionForm = [];
        for(let i=0; i<this.state.noq; i++){
            let j = i+1;
            QuestionForm.push(
                <div>
                    <label>
                        Question {j}. <input type="text" id={j} name="question"  onChange={this.handleQuestion}/>
                    </label><br/>
                    <label>
                        1. <input type="text" id={j} name="Options1"  onChange={this.handleOptions1}/>
                    </label><br/>
                    <label>
                        2. <input type="text" id={j} name="Options2"  onChange={this.handleOptions2}/>
                    </label><br/>
                    <label>
                        3. <input type="text" id={j} name="Options3"  onChange={this.handleOptions3}/>
                    </label><br/>
                    <label>
                        4. <input type="text" id={j} name="Options4"  onChange={this.handleOptions4}/>
                    </label><br/>
                    <label>
                    Key:
                        <select value={this.state.value} id={j} onChange={this.handleKey}>
                            <option>Select Answer Key</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </label><br/>
                    <label>
                        Explaination: <input type="text" id={j} name="explain"  onChange={this.handleExplain}/>
                    </label><br/>
                </div>
            );
        }

        return QuestionForm;
    }

    //update question on every changes
    handleQuestion(e){
        let arr = [...this.state.test_data]
        console.log(this.state.test_data.length)
        if(this.state.test_data.length){
            var count = 0;
            for(let i = 0; i<this.state.test_data.length;i++){
                if(this.state.test_data[i].questionNum === e.target.id){
                    count = 1;
                    console.log("Updating Array")
                    //update data into array
                    this.setState(prevState => ({
                        test_data: prevState.test_data.map(
                        obj => (obj.questionNum === e.target.id ? Object.assign(obj, { question: e.target.value }) : obj)
                    )
                    }));
                }
            }
            if(count==0){
                console.log("push array if new element")
                // Add data into array
                arr.push({
                    questionNum : e.target.id,
                    question    : e.target.value
                });
                this.setState({
                    test_data:arr
                });
            }
        }else{
            console.log("Creating array first element")
            // Add data into array
            arr.push({
                questionNum : e.target.id,
                question    : e.target.value
            });
            this.setState({
                test_data:arr
            });
        }
        
    }

    //update key on every changes
    handleKey(e){
        let arr = [...this.state.test_data]
        console.log(this.state.test_data.length)
        if(this.state.test_data.length){
            var count = 0;
            for(let i = 0; i<this.state.test_data.length;i++){
                if(this.state.test_data[i].questionNum === e.target.id){
                    count = 1;
                    console.log("Updating Array")
                    //update data into array
                    this.setState(prevState => ({
                        test_data: prevState.test_data.map(
                        obj => (obj.questionNum === e.target.id ? Object.assign(obj, { key: e.target.value }) : obj)
                    )
                    }));
                }
            }
            if(count==0){
                console.log("push array if new element")
                // Add data into array
                arr.push({
                    questionNum : e.target.id,
                    key         : e.target.value
                });
                this.setState({
                    test_data:arr
                });
            }
        }else{
            console.log("Creating array first element")
            // Add data into array
            arr.push({
                questionNum : e.target.id,
                key         : e.target.value
            });
            this.setState({
                test_data:arr
            });
        }
        
    }

    //update options1 on every changes 
    handleOptions1(e){
        let arr = [...this.state.test_data]
        console.log(this.state.test_data.length)
        if(this.state.test_data.length){
            var count = 0;
            for(let i = 0; i<this.state.test_data.length;i++){
                if(this.state.test_data[i].questionNum === e.target.id){
                    count = 1;
                    console.log("Updating Array")
                    //update data into array
                    this.setState(prevState => ({
                        test_data: prevState.test_data.map(
                        obj => (obj.questionNum === e.target.id ? Object.assign(obj, { options1: e.target.value }) : obj)
                    )
                    }));
                }
            }
            if(count==0){
                console.log("push array if new element")
                // Add data into array
                arr.push({
                    questionNum : e.target.id,
                    options1    : e.target.value
                });
                this.setState({
                    test_data:arr
                });
            }
        }else{
            console.log("Creating array first element")
            // Add data into array
            arr.push({
                questionNum : e.target.id,
                options1    : e.target.value
            });
            this.setState({
                test_data:arr
            });
        }
    }

    //update options2 on every changes 
    handleOptions2(e){
        let arr = [...this.state.test_data]
        console.log(this.state.test_data.length)
        if(this.state.test_data.length){
            var count = 0;
            for(let i = 0; i<this.state.test_data.length;i++){
                if(this.state.test_data[i].questionNum === e.target.id){
                    count = 1;
                    console.log("Updating Array")
                    //update data into array
                    this.setState(prevState => ({
                        test_data: prevState.test_data.map(
                        obj => (obj.questionNum === e.target.id ? Object.assign(obj, { options2: e.target.value }) : obj)
                    )
                    }));
                }
            }
            if(count==0){
                console.log("push array if new element")
                // Add data into array
                arr.push({
                    questionNum : e.target.id,
                    options2    : e.target.value
                });
                this.setState({
                    test_data:arr
                });
            }
        }else{
            console.log("Creating array first element")
            // Add data into array
            arr.push({
                questionNum : e.target.id,
                options2    : e.target.value
            });
            this.setState({
                test_data:arr
            });
        }
    }

    //update options3 on every changes 
    handleOptions3(e){
        let arr = [...this.state.test_data]
        console.log(this.state.test_data.length)
        if(this.state.test_data.length){
            var count = 0;
            for(let i = 0; i<this.state.test_data.length;i++){
                if(this.state.test_data[i].questionNum === e.target.id){
                    count = 1;
                    console.log("Updating Array")
                    //update data into array
                    this.setState(prevState => ({
                        test_data: prevState.test_data.map(
                        obj => (obj.questionNum === e.target.id ? Object.assign(obj, { options3: e.target.value }) : obj)
                    )
                    }));
                }
            }
            if(count==0){
                console.log("push array if new element")
                // Add data into array
                arr.push({
                    questionNum : e.target.id,
                    options3    : e.target.value
                });
                this.setState({
                    test_data:arr
                });
            }
        }else{
            console.log("Creating array first element")
            // Add data into array
            arr.push({
                questionNum : e.target.id,
                options3    : e.target.value
            });
            this.setState({
                test_data:arr
            });
        }
    }

    //update options4 on every changes 
    handleOptions4(e){
        let arr = [...this.state.test_data]
        console.log(this.state.test_data.length)
        if(this.state.test_data.length){
            var count = 0;
            for(let i = 0; i<this.state.test_data.length;i++){
                if(this.state.test_data[i].questionNum === e.target.id){
                    count = 1;
                    console.log("Updating Array")
                    //update data into array
                    this.setState(prevState => ({
                        test_data: prevState.test_data.map(
                        obj => (obj.questionNum === e.target.id ? Object.assign(obj, { options4: e.target.value }) : obj)
                    )
                    }));
                }
            }
            if(count==0){
                console.log("push array if new element")
                // Add data into array
                arr.push({
                    questionNum : e.target.id,
                    options4    : e.target.value
                });
                this.setState({
                    test_data:arr
                });
            }
        }else{
            console.log("Creating array first element")
            // Add data into array
            arr.push({
                questionNum : e.target.id,
                options4    : e.target.value
            });
            this.setState({
                test_data:arr
            });
        }
    }

    //update explaination on every changes
    handleExplain(e){
        let arr = [...this.state.test_data]
        console.log(this.state.test_data.length)
        if(this.state.test_data.length){
            var count = 0;
            for(let i = 0; i<this.state.test_data.length;i++){
                if(this.state.test_data[i].questionNum === e.target.id){
                    count = 1;
                    console.log("Updating Array")
                    //update data into array
                    this.setState(prevState => ({
                        test_data: prevState.test_data.map(
                        obj => (obj.questionNum === e.target.id ? Object.assign(obj, { explain: e.target.value }) : obj)
                    )
                    }));
                }
            }
            if(count==0){
                console.log("push array if new element")
                // Add data into array
                arr.push({
                    questionNum : e.target.id,
                    explain     : e.target.value
                });
                this.setState({
                    test_data:arr
                });
            }
        }else{
            console.log("Creating array first element")
            // Add data into array
            arr.push({
                questionNum : e.target.id,
                explain     : e.target.value
            });
            this.setState({
                test_data:arr
            });
        }
        
    }

    //set state of author id
    setAuthorId(){
        var a = sessionStorage.getItem('user');
        a = JSON.parse(a);
        this.setState({
            auth_id: a.userId
        })
    }

    //runs automatically before render function.
    async componentWillMount(){
        this.setAuthorId();
        await this.settingExamId();
        await this.settingExamName();
        this.loadExamNameFromServer();
    }


    //update negative marking
    handleExamSelection(e){
        this.setState({
            examId: e.target.value
        })
    }

    //save test to database
    handlePostTest(){
        if(this.state.examId === null || this.state.examId === "" || this.state.examId === undefined){
            return;
        }
        var today = new Date();
        //var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();  
        var date = today.getTime();      
        const formData =  {
            examId        : this.state.examId,
            noq           : this.state.noq,
            negt_mark     : this.state.negt_mark,
            timeof_test   : this.state.timeof_test,
            dateof_create : date,
            auth_id       : this.state.auth_id,
            attempts      : this.state.attempts,
            test_data     : this.state.test_data
        }
 
        fetch('http://localhost:3001/api/createNewTest', { 
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify(formData)
        })
        .then(res=>res.json())
    }

    // to set state = examId from local storage if empty
  settingExamId() {
    console.log("settingExamId funtion running");
    if (this.state.examId === "" || this.state.examId === null || this.state.examId === undefined) {
      var e = localStorage.getItem('exam_id');
      this.setState({
        examId: e
      })
    } else {
      console.log("Exam Id already available")
    }
  }

  // to set state = examName from local storage if empty
  settingExamName() {
    console.log("settingExamId funtion running");
    if (this.state.examName === "" || this.state.examName === null || this.state.examName === undefined) {
      var e = localStorage.getItem('exam_name');
      this.setState({
        examName: e
      })
    } else {
      console.log("Exam Name already available")
    }
  }

    render(){
        return <div>
            <h1>Add New Test</h1>
            <div id="test" style={{display: "block"}}>
                <form onSubmit={this.handleSubmit}>
                <label>
                Exam Name:{this.state.examName}
                </label><br/>
                <label>
                Numbers Of Questions:
                <input type="number" name="noq" id="noq" placeholder="ex. 25" min="1" max="100" onChange={this.handleNoq}/>
                </label><br/>
                <label>
                Time of Test:
                <input type="number" name="timeof_test" id="timeof_test" placeholder="ex. 30" min="1" max="180" onChange={this.handleTimeof_test}/>
                Minutes
                </label><br/>
                <label>
                Negative Marking:
                    <select value={this.state.value} onChange={this.handleNegt_mark}>
                        <option value="0">none</option>
                        <option value="0.25">1/4</option>
                        <option value="0.50">1/2</option>
                        <option value="0.75">3/4</option>
                        <option value="1">1</option>
                    </select>
                </label><br/>
                <input type="submit" value="Submit" />
                </form>
            </div>
            <div id="testData" style={{display:"none"}}>
                <div>
                    <h6>Number Of Question : {this.state.noq}</h6>
                    <h6>Time Of Test       : {this.state.timeof_test} Minutes</h6>
                    <h6>Negative Marking   : {this.state.negt_mark}</h6>
                </div>
                <hr/>
                <div>{this.createQuestionForm()}</div>
                <button type="submit" onClick={this.handlePostTest}>Submit</button>
            </div>            
        </div>
    }
}

export default AddNewTest;