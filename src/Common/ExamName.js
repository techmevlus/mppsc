import React from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';




class ExamName extends React.PureComponent {

    constructor(props, context) {
        super(props, context);
        this.state = {
            exams: []
        }
        this.loadExamNameFromServer = this.loadExamNameFromServer.bind(this);

    }

    // loads data from server
    loadExamNameFromServer() {
        fetch(this.props.url)
            .then(res => res.json())
            .then(exams => {
                this.setState({ exams })
            })
    }

    //gets called automatically before render
    componentWillMount() {
        this.loadExamNameFromServer();
    }

    // save exam id to local storage
    savingToLocalStorage(value) {
        localStorage.setItem('_id', value);
    }

    
    render() {
        if (this.state.exams === "" || this.state.exams === undefined || this.state.exams === null) {
            console.log("Data fetch failed")
        } else {
            console.log("Data fetch succeeded")
        }
        return <div>
            
           
<div class="d-flex justify-content-center" >
    <h3 style={{marginBottom:"40px"}}>Available Examinations</h3>
</div>
<Grid container   spacing={4} >
      <Grid item xs={12}>
        <Grid container justify="center"  spacing={4}>
        {this.state.exams.map((item, index) => (
               <Grid key={index} item >
              
               <Link to="/testDetails" key={index} onClick={() => this.savingToLocalStorage(item._id)}>
                        <Paper style={{width:"150px",height:"150px", alignItems:"bottom" , justify:"center" }}>
                        <div  class="icon-box" style={{ align:"centre",textAlign: "center", paddingTop:"20px"}} key={index}>
                        <img src="assets/img/sbilogo.jpg"  width="65px" height="65px"  alt="..."></img>
                        <br></br>
                        <div style={{marginTop:"10px"}}> 
                        {item.exam_name}
                        </div>
                        
                        </div>
                        </Paper>
                    </Link>
             </Grid>
                  
                ))}
       
        </Grid>
      </Grid>
     
    </Grid>
            
        </div>
    }
}
export default ExamName;