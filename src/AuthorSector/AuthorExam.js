import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
let data = require('../data'); //this imports data from local file, pass it as a prop to Quiz component



class AuthorExam extends React.PureComponent{
	constructor(props, context) {
	    super(props, context);
	    this.state = {
	    	data:""
	    }
	
	}



	
	render () {  console.log("DATA IS COMMING", this.props.location.productdetailProps)
        return 	 <div> 
              <main id="main">
                <p>
                 
                  MY NAME IS KULDEEP
                </p>

    </main>



	            </div>; 
	}
}


AuthorExam.PropTypes = {
	books: PropTypes.bool.isRequired,
 }
 /*Book.PropTypes = {
 	b: PropTypes.string
 }
*/
export default AuthorExam;