import React from 'react';
import Timer from '../QuizComponents/Timer';
import { Fab } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

//<button key={index} onClick={()=>this.panelClick(e.questionNum)} style={{backgroundColor:e.questionColor}}>{e.questionNum}</button> ON LINE NO. 377

var startDate = new Date().getTime() + 5520000;

class Test extends React.PureComponent{

    constructor(props, context){
        super(props, context);
            this.state = {
                data           : [],
                test_id        : "",
                testData       : [{options:[]}],
                resultData     : [],
                examId         : "",
                testId         : "",
                correctAnswer  : 0,
                currentQuestion: 0,
                questionPanel  : []
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
                test_id : this.state.data.test[e]._id
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
            obj => (obj.questionNum-1 === this.state.currentQuestion ? Object.assign(obj, { questionColor: "red" }) : obj)
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
                questionColor: "red"
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
            console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", this.state.data);
        }
        this.fetchRadioButtonHistory();
        this.fetchResult();
        console.log(this.props.url)
        console.log(this.state.testData)
        console.log(this.state.resultData)
        console.log(this.state.currentQuestion)
        console.log(this.state.questionPanel)
		return <div style={{padding:"10px", border:"2px", borderColor:"black"}}>
          
           {/* <div id="timer" style={{display:"block"}}><Timer startDate={startDate} /></div> */}
            <div class="container">

<div style={{padding:"20px"}} class="row">
    <div class="col-2"id="timer" style={{display:"block"}}><Timer startDate={new Date().getTime() + 5520000} /></div>
    <div class="col-8 d-flex flex-row-reverse">  <h5 id="testHeading">Test ID : {this.state.test_id}</h5></div>
   
  </div>
</div>




           
            <div id="testIncomplete" style={{display:"block"}}>
                <div style={{width:"68%", margin:"35px"}}>
            <div class = "shadow" style={{ backgroundColor:"#F5F5F5", borderRadius:"15px", padding:"35px"}}>
            <div id="question" style={{display:"block"}}><h3>Q.{this.state.currentQuestion+1} {this.state.testData[this.state.currentQuestion].question}</h3></div>
            <hr></hr>
            
                <div style={{fontSize:"20px"}}>
                    <input class="form-check-input" type="radio"  name="option" id="1" value="1" onClick={()=>this.selectRadio("1")}/>
                    <label >   &nbsp;&nbsp; 1. {this.state.testData[this.state.currentQuestion].options1} </label>
                </div><hr></hr>
                <div style={{fontSize:"20px"}}>
                    <input class="form-check-input" type="radio" name="option" id="2" value="2" onClick={()=>this.selectRadio("2")}/>
                    <label> &nbsp;&nbsp; 2. {this.state.testData[this.state.currentQuestion].options2} </label>
                </div><hr></hr>
                <div style={{fontSize:"20px"}}>
                    <input class="form-check-input" type="radio" name="option" id="3" value="3" onClick={()=>this.selectRadio("3")}/>
                    <label> &nbsp;&nbsp; 3. {this.state.testData[this.state.currentQuestion].options3} </label>
                </div><hr></hr>
                <div style={{fontSize:"20px"}}>
                    <input class="form-check-input" type="radio" name="option" id="4" value="4" onClick={()=>this.selectRadio("4")}/>
                    <label> &nbsp;&nbsp; 4. {this.state.testData[this.state.currentQuestion].options4} </label>

                </div>
               

                </div>
                <div style={{marginTop:"40px", textAlign:"right"}} class="d-grid gap-2  d-md-block ">  
            
            <button  style={{marginRight:"5px"}} type="button" class="btn btn-outline-secondary" onClick={() => this.previewsButton()}>Previews Question</button>
            <button  style={{marginRight:"5px"}} type="button" class="btn btn-outline-primary" onClick={() => this.nextButton()}>Next Question</button>
            <button style={{marginRight:"5px"}} type="button" class="btn btn-outline-danger" onClick={() => this.clearButton()}>Clear Response</button>
          { /* <button  style={{marginRight:"5px"}} type="button" class="btn btn-outline-success" onClick={() => this.submitButton()}>Submit Test</button> */}

           
<button style={{marginRight:"5px"}}  type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Submit Test
</button>


<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Do you want to end the Test ?</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div style={{textAlign:'left'}} class="modal-body">
        <p>Once you Submit the Test you won't be able to get back</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
        <button  style={{marginRight:"5px"}} type="button" class="btn btn-outline-success" onClick={() => this.submitButton()} data-dismiss="modal">Submit Test</button>
      </div>
    </div>
  </div>
</div>
            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">DASHBOARD</button>

           </div>


               </div> 

            
           
           </div>


<div class="offcanvas offcanvas-end" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasScrollingLabel">GREEN : Question Attempted <br></br> RED : Unanswered</h5>
    
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
  <div>
  <hr></hr>
                {this.state.questionPanel.map((e, index)=>(
             <span>
                    <Fab key={index} onClick={()=>this.panelClick(e.questionNum)} style={{backgroundColor:e.questionColor, margin:"5px", color:"white"}}   aria-label={e.questionNum}>{e.questionNum}
                    
                    </Fab>
                    
                    </span>
                ))}
            </div>


            
  

  </div>
</div>


           
            
            <div class="alert alert-success" role="alert" id="testCompleted" style={{display:"none"}}>
                    <span><h4 class="alert-heading">Exam Completed <CheckCircleIcon style={{color:"blue",size:"20px"}}> </CheckCircleIcon></h4> </span>
                    <hr></hr>
					<h6>Total Attempted Question : {this.state.resultData.length}</h6>
					<h6>Your Score : {this.state.correctAnswer}</h6>
			</div>
        </div>
	}
}

export default Test; 