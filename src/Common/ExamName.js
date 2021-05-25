import React from 'react';
import { Link } from 'react-router-dom';

class ExamName extends React.PureComponent{

    constructor(props, context){
        super(props, context);
        this.state = {
            exams:[]
        }
        this.loadExamNameFromServer = this.loadExamNameFromServer.bind(this);

    }

    loadExamNameFromServer(){
        fetch(this.props.url)
        .then(res => res.json())
        .then(exams =>{
            this.setState({ exams })
        })
    }

    componentWillMount(){
        this.loadExamNameFromServer();
    }

  
	
    

	render () { 
        if(this.state.exams === "" || this.state.exams === undefined || this.state.exams === null){
            console.log("Data fetch failed")
        }else{
            console.log("Data fetch succeeded")
        }
        return 	 <div>
            <ul>
            {this.state.exams.map((item, index) =>(
                          <Link     to={{
                            pathname: "/testDetails",
                            exam_id: {
                             id: item._id
                            }
                         }}> 
                
                
                <li  key={index}>{item.exam_name}</li>
                </Link>
            ))}
            </ul>
        </div>
	}
}
export default ExamName;