import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Question from './Question.js';
import Options from './Options.js';
let data = require('../data'); //this imports data from local file, pass it as a prop to Quiz component

const shuffleArray = array => {
	let i = array.length - 1;
	for (; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

class VideoLecture extends React.PureComponent{
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

	
	render () { 
        return 	 <div> 
              <main id="main">


			  <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <ol>
          <li><a href="index.html">Home</a></li>
          <li>Lectures</li>
        </ol>
        <h2>Video Lecture</h2>

      </div>
    </section>


			  <section id="featured" class="featured">
      <div class="container">

        <div class="row">
          <div class="col-lg-4">
            <div class="icon-box">
			
			  <iframe src='https://www.youtube.com/embed/frXU2Car2Dw'
        frameborder='1'
        allow='autoplay; encrypted-media'
        allowfullscreen='allowfullscreen'
        title='video'
/>
            </div>
          </div>
          <div class="col-lg-4 mt-4 mt-lg-0">
            <div class="icon-box">
			  <iframe src='https://www.youtube.com/embed/AojJuwck9wQ'
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen='allowfullscreen'
        title='video'
/>
            </div>
          </div>
          <div class="col-lg-4 mt-4 mt-lg-0">
            <div class="icon-box">
			  <iframe src='https://www.youtube.com/embed/Ucrjsc07BOQ'
        frameborder='0'
        allow='autoplay; encrypted-media'
        allowfullscreen='allowfullscreen'
        title='video'
/>
            </div>
          </div>
        </div>

      </div>
    </section>

		

			


              </main>
              
   

	            </div>; 
	}
}


VideoLecture.PropTypes = {
	books: PropTypes.bool.isRequired,
 }
 /*Book.PropTypes = {
 	b: PropTypes.string
 }
*/
export default VideoLecture;