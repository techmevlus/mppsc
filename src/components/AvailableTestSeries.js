import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Question from './Question.js';
import Options from './Options.js';
let data = require('../data'); //this imports data from local file, pass it as a prop to Quiz component



class AvailableTestSeries extends React.PureComponent{
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	data:""
	    }
		this.loadQuestionsFromServer = this.loadQuestionsFromServer.bind(this);
	}
	loadQuestionsFromServer() {
		fetch(this.props.url)
			.then(res => res.json())
			.then(data=>{
		    	this.setState({ data });
			})
    }

	componentWillMount() {
		this.loadQuestionsFromServer();
    }

	resetOptionColor() {
		document.getElementById("1").className = "strong options";
		document.getElementById("2").className = "strong options";
		document.getElementById("3").className = "strong options";
		document.getElementById("4").className = "strong options";
	}

	
	render () { console.log("product props is", this.props.location.productdetailProps);
        return 	 <div> 
              <main id="main">
              <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <ol>
          <li><a href="index.html">Home</a></li>
          <li>Test Series</li>
        </ol>
        <h2>Test Series</h2>

      </div>
    </section>

 
    <section id="contact" class="contact">
      <div class="container">

        <div class="row">


         
        <div class="col-lg-3 col-md-6">
        <Link     to={{
      pathname: "/quiz.html",
      productdetailProps: {
       productdetail: "WORKING VERY WELL"
      }
   }}>  


            <div class="info-box  mb-4">
              <i class="bx bx-envelope"></i>
              <h3>Email Us</h3>
              <p>support@mevlus.com</p>
            </div>

            </Link>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="info-box  mb-4">
              <i class="bx bx-phone-call"></i>
              <h3>Call Us</h3>
              <p>+91 9755 088077</p>
            </div>
          </div>
          <div class="col-lg-3 col-md-6">
            <div class="info-box  mb-4">
              <i class="bx bx-envelope"></i>
              <h3>Email Us</h3>
              <p>support@mevlus.com</p>
            </div>
          </div>

          <div class="col-lg-3 col-md-6">
            <div class="info-box  mb-4">
              <i class="bx bx-phone-call"></i>
              <h3>Call Us</h3>
              <p>+91 9755 088077</p>
            </div>
          </div>

        </div>

 

      </div>
    </section>

  
              </main>
              
   

	            </div>; 
	}
}


AvailableTestSeries.PropTypes = {
	books: PropTypes.bool.isRequired,
 }
 /*Book.PropTypes = {
 	b: PropTypes.string
 }
*/
export default AvailableTestSeries;