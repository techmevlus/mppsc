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

class OurTeam extends React.PureComponent{
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
          <li>Team</li>
        </ol>
        <h2>Team </h2>

      </div>
    </section>



    <section id="team" class="team">
      <div class="container">

        <div class="row">
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <img src="assets/img/team/team-1.jpg" alt=""></img>
              <h4>Walter White</h4>
              <span>Chief Executive Officer</span>
              <p>
                Magni qui quod omnis unde et eos fuga et exercitationem. Odio veritatis perspiciatis quaerat qui aut aut aut
              </p>
              <div class="social">
                <a href=""><i class="bi bi-twitter"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
                <a href=""><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <img src="assets/img/team/team-2.jpg" alt=""></img>
              <h4>Sarah Jhinson</h4>
              <span>Product Manager</span>
              <p>
                Repellat fugiat adipisci nemo illum nesciunt voluptas repellendus. In architecto rerum rerum temporibus
              </p>
              <div class="social">
                <a href=""><i class="bi bi-twitter"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
                <a href=""><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="member">
              <img src="assets/img/team/team-3.jpg" alt=""></img>
              <h4>William Anderson</h4>
              <span>CTO</span>
              <p>
                Voluptas necessitatibus occaecati quia. Earum totam consequuntur qui porro et laborum toro des clara
              </p>
              <div class="social">
                <a href=""><i class="bi bi-twitter"></i></a>
                <a href=""><i class="bi bi-facebook"></i></a>
                <a href=""><i class="bi bi-instagram"></i></a>
                <a href=""><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>




		

			


              </main>
              
   

	            </div>; 
	}
}


OurTeam.PropTypes = {
	books: PropTypes.bool.isRequired,
 }
 /*Book.PropTypes = {
 	b: PropTypes.string
 }
*/
export default OurTeam;