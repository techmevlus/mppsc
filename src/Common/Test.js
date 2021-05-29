import React from 'react';
import Timer from '../QuizComponents/Timer';

var startDate = new Date().getTime() + 5520000;

class Test extends React.PureComponent{

    constructor(props, context){
        super(props, context);
            this.state = {
                data : [],
                examName: "",
                testData:[{options:[]}],
                resultData:[],
                examId: "",
                testId: "",
                correctAnswer: 0,
                currentQuestion: 0,
                questionPanel:[]
            }
        this.loadTestFromServer = this.loadTestFromServer.bind(this);
        this.componentRefresh = this.componentRefresh.bind(this);
    }
	
    async loadTestFromServer(){

        const formData = { 
                            examId  : this.state.examId,
                            testId: this.state.testId
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
			.then(data=>{
		    	this.setState({ data });
			});
            var e;
            for(let i = 0; i<this.state.data.test.length;i++){
                if(this.state.testId == this.state.data.test[i].auth_id){
                    e = i;       
                    console.log(this.state.data.test[e].auth_id);
                }
            }
            this.setState({
                testData : this.state.data.test[e].test_data,
                examName : this.state.data.test[e].auth_id
            });
    }

  // to set state = to persist on refresh using local storage
  settingStates() {
    console.log("settingExamId funtion running");
    if (this.state.examId === "" || this.state.examId === null || this.state.examId === undefined) {
      var e = localStorage.getItem('_id');
      this.setState({
        examId: e
      })
    } 
    if (this.state.testId === "" || this.state.testId === null || this.state.testId === undefined) {
        var e = localStorage.getItem('testId');
        this.setState({
          testId: e
        })
    }
  }

  // this function is called automatically before render
    async componentWillMount(){
        console.log("Component is mounting...")
        await this.settingStates();
        await this.loadTestFromServer();
        this.questionPanelFunct();
    }

    // this function automatically gets called when component is destroyed
     componentWillUnmount() {
        console.log("Component is unmounting...")
     }

     //to save state to local storage
     componentRefresh() {
        console.log("componentRefresh function working")
        localStorage.setItem('_id', this.state.examId);
        localStorage.setItem('testId', this.state.testId);
     }

    // after render this function is called automatically. 
    componentDidMount() {
        //this will be always ready for page refresh event.
        window.addEventListener('beforeunload', this.componentRefresh);

    }


   //Option Selected. radio button selected
   selectRadio(value){

        document.getElementById(value).checked = "true";
        
        //Match and add array element.
        let arr = [...this.state.resultData]; 
        
        let a = arr.filter((e)=>{
            if(e.questionId == this.state.currentQuestion){
            return e;
            }
        })
    
        if(a.length > 0){
            // Update Radio button. Selection Changed
                this.setState(prevState => ({
                    resultData: prevState.resultData.map(
                    obj => (obj.questionId === this.state.currentQuestion ? Object.assign(obj, { selectedOption: value }) : obj)
                )
                }));
        }else{
            // Add data into array
            arr.push({
                questionId:this.state.currentQuestion,
                answerKey:this.state.testData[this.state.currentQuestion].key,
                selectedOption: value
            });
            this.setState({
                resultData:arr
            });
        }
        // Update question panel Color
        this.setState(prevState => ({
            questionPanel: prevState.questionPanel.map(
            obj => (obj.questionNum-1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: "green" }) : obj)
        )
        }));
   }

   //Clear button function
   clearButton(){

       //to clear radio button
			var ele = document.getElementsByName("option");
            for(var i=0;i<ele.length;i++)
               ele[i].checked = false;
         
         //Match and delete array element.

         let arr = [...this.state.resultData];

         let a = arr.filter((e)=>{
             if(e.questionId == this.state.currentQuestion){
               return e;
             }
           })
       
           if(a.length > 0){
             let a = arr.filter((e) => {
                 if (e.questionId != this.state.currentQuestion) {
                   return e;
                 }
               });
               this.setState({
                 resultData:a
               })
           }
        // Update question panel Color
        this.setState(prevState => ({
            questionPanel: prevState.questionPanel.map(
            obj => (obj.questionNum-1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: "white" }) : obj)
        )
        }));
   }

   nextButton(){
        var a = this.state.currentQuestion +1;
        if(this.state.testData.length !== a){
            this.setState({
                currentQuestion : a
            })
        }
   }

   previewsButton(){
        var a = this.state.currentQuestion -1;
        if(this.state.currentQuestion){
            this.setState({
                currentQuestion : a
            })
        }
   }

   //after render update for radio button
   fetchRadioButtonHistory(){
       //clear radio button if Question already not attempted 	
       var count = 0;	
       for(let i = 0;i<this.state.resultData.length;i++){
           
           //Check if question already attempted			
           if(this.state.resultData[i].questionId==this.state.currentQuestion){
               console.log("Question already attempted");
               var ele = document.getElementById(this.state.resultData[i].selectedOption);
               ele.checked = true;
               count = 1;
           }
       }	
       if(count==0){
           var ele = document.getElementsByName("option");
           for(var i=0;i<ele.length;i++)
               ele[i].checked = false;
       }
   }

   //this function will calculate result
   fetchResult(){
        var a = 0;
        for(let i = 0;i<this.state.resultData.length;i++){
                
            // Counting total number of correct answer
            
            if(this.state.resultData[i].answerKey == this.state.resultData[i].selectedOption){
                a = a + 1 ;
            }
        }
        this.setState({
            correctAnswer : a
        });
   }

   //submit test function on submit button click
   submitButton(){
    document.getElementById("timer").style.display="none";
    document.getElementById("question").style.display="none";
    document.getElementById("testIncomplete").style.display="none";
    document.getElementById("testCompleted").style.display="block";
   }

   //function for question panel
   questionPanelFunct(){
        let arr = [...this.state.questionPanel];
        for(let i = 0;i<this.state.testData.length;i++){
            // Add data into array
            arr.push({
                questionNum : i + 1,
                questionColor: "white"
            });
        }this.setState({
            questionPanel:arr
        });
   }

   //redirect to question by panel click
   panelClick(value){
       value = value - 1;
       this.setState({
           currentQuestion  : value
       })
   }


	render () {
        if(this.state.data==="" || this.state.data === undefined || this.state.data === null){
            console.log("test data is empty");
        }else{
            console.log("tests are recieved");
        }
        this.fetchRadioButtonHistory();
        this.fetchResult();
        console.log(this.props.url)
        console.log(this.state.testData)
        console.log(this.state.resultData)
        console.log(this.state.currentQuestion)
        console.log(this.state.questionPanel)
		return <div>
            <h1 id="testHeading">this is Author id = {this.state.examName}</h1>
            <div id="timer" style={{display:"block"}}><Timer startDate={startDate} /></div>
            <div id="question" style={{display:"block"}}>Q.{this.state.currentQuestion+1} {this.state.testData[this.state.currentQuestion].question}</div>
            <div id="testIncomplete" style={{display:"block"}}>
                <div>
                    <input type="radio" name="option" id="1" value="1" onClick={()=>this.selectRadio("1")}/>
                    <label> &nbsp;&nbsp; 1. {this.state.testData[this.state.currentQuestion].options[0]} </label>
                </div>
                <div>
                    <input type="radio" name="option" id="2" value="2" onClick={()=>this.selectRadio("2")}/>
                    <label> &nbsp;&nbsp; 2. {this.state.testData[this.state.currentQuestion].options[1]} </label>
                </div>
                <div>
                    <input type="radio" name="option" id="3" value="3" onClick={()=>this.selectRadio("3")}/>
                    <label> &nbsp;&nbsp; 3. {this.state.testData[this.state.currentQuestion].options[2]} </label>
                </div>
                <div>
                    <input type="radio" name="option" id="4" value="4" onClick={()=>this.selectRadio("4")}/>
                    <label> &nbsp;&nbsp; 4. {this.state.testData[this.state.currentQuestion].options[3]} </label>
                </div>
            <button onClick={() => this.clearButton()}>Clear</button>
            <button onClick={() => this.previewsButton()}>Previews Question</button>
            <button onClick={() => this.nextButton()}>Next Question</button>
            <button onClick={() => this.submitButton()}>Submit</button>
            <div>
                {this.state.questionPanel.map((e, index)=>(
                    <button key={index} onClick={()=>this.panelClick(e.questionNum)} style={{backgroundColor:e.questionColor}}>{e.questionNum}</button>
                ))}
            </div>
            </div>
            <div id="testCompleted" style={{display:"none"}}>
                    <h4>Exam Completed</h4>
					<h6>Total Attempted Question : {this.state.resultData.length}</h6>
					<h6>Your Score : {this.state.correctAnswer}</h6>
			</div>
        </div>
	}
}

export default Test; 