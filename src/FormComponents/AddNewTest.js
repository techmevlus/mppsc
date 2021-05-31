import React from 'react';

class AddNewTest extends React.PureComponent{

    constructor(props, context){
        super(props, context);
        this.state = {
            noq : ""
        }
        this.handleNoq = this.handleNoq.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNoq(e){
        this.setState({
            noq : e.target.value
        });
    }

    handleSubmit(e){
        document.getElementById("test").style.display = "none";
        document.getElementById("testData").style.display = "block";
        e.preventDefault();
    }

    //Dynamically create Question Form
    createQuestionForm(){
        let QuestionForm = [];
        for(let i=0; i<this.state.noq; i++){
            QuestionForm.push(
                <div>
                    <h4>Question {i+1}.</h4>
                    <h4>Option 1.</h4>
                    <h4>Option 2.</h4>
                    <h4>Option 3.</h4>
                    <h4>Option 4.</h4>
                </div>
            );
        }

        return QuestionForm;
    }

    render(){
        return <div>
            <h1>Add New Test</h1>
            <div id="test" style={{display: "block"}}>
                <form onSubmit={this.handleSubmit}>
                <label for="noq">Numbers Of Questions:</label>
                <input type="number" name="noq" id="noq" placeholder="ex. 25" min="2" max="100" onChange={this.handleNoq}/>
                <input type="submit" value="Submit" />
                </form>
            </div>
            <div id="testData" style={{display:"none"}}>
                <div>
                    <h4>Number Of Question : {this.state.noq}</h4>
                </div>
                <div>{this.createQuestionForm()}</div>
            </div>            
        </div>
    }
}

export default AddNewTest;