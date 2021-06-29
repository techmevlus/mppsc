import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import emailjs from 'emailjs-com';
import { Fab } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import SendIcon from '@material-ui/icons/Send';
import { withSnackbar } from 'notistack';
import Button from '@material-ui/core/Button';



let data = require('../data'); //this imports data from local file, pass it as a prop to Quiz component

class ContactUs extends React.PureComponent{
	constructor(props, context) {
	    super(props, context);
      this.state = { feedback: '',
      name: '',
      email: '' ,
      subject:'',
      success:false,
      loading:false,
      timePassed:false


     };

	}


   handleButtonClick = () => {
    if (!this.state.loading) {
     
      this.setState({success: false, loading:true})
      setTimeout(() => { this.setState({timePassed: true, success: true, loading:false }) }, 1700);
      if (!this.state.timePassed){
        console.log("timeout")
      }
    
    }
  };

     // saves the user's name entered to state
     nameChange = (event) => {
      this.setState({name: event.target.value})
    }
    
    // saves the user's email entered to state
    emailChange = (event) => {
      this.setState({email: event.target.value})
    }

    // saves the user's message entered to state
    messageChange = (event) => {
      this.setState({feedback: event.target.value})
    }

    subjectChange = (event) => {
      this.setState({subject: event.target.value})
    }
    //onSubmit of email form
    handleSubmit = (event) => {
      this.setState({ loading:true }) 

      event.preventDefault();

      //This templateId is created in EmailJS.com
      const templateId = 'template_vh9pdez';
  
      //This is a custom method from EmailJS that takes the information 
      //from the form and sends the email with the information gathered 
      //and formats the email based on the templateID provided.
      this.sendFeedback(templateId, {
                                      message: this.state.feedback, 
                                      user_name: this.state.name, 
                                      user_email: this.state.email
                                     }
                       )

    }
  
    //Custom EmailJS method
    sendFeedback = (templateId, variables) => {
      window.emailjs.send(
        'service_ax3aape', templateId,
        variables
        ).then(res => {
          this.setState({timePassed: true, success: true, loading:false }) 
          setTimeout(() => { this.setState({timePassed: false, success: false, loading:false, feedback:"", name:"", email:"" , message:"", subject:"" }) }, 1700);
          // Email successfully sent alert
          console.log('Email sent:', res)
          this.props.enqueueSnackbar('  Message sent Successfully. ', {   variant: 'success'  })
        })
        // Email Failed to send Error alert
        .catch(err => {
       
          console.error('Email Error:', err)
        })
    }
 
	render () { 
        return 	 <div> 
              <main id="main">


              <section id="breadcrumbs" class="breadcrumbs">
      <div class="container">

        <ol>
          <li><a href="index.html">Home</a></li>
          <li>Contact</li>
        </ol>
        <h2>Contact</h2>

      </div>
    </section>

 
    <section id="contact" class="contact">
      <div class="container">

        <div class="row">
          <div class="col-lg-6">
            <div class="info-box mb-4">
              <i class="bx bx-map"></i>
              <h3>Our Address</h3>
              <p>83 A Vijay Nagar, Indore </p>
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

        <div class="row">

          <div class="col-lg-6 ">
          <iframe class="mb-4 mb-lg-0" 
          src="https://maps.google.com/maps?q=VIJAY%20NAGAR%20INDORE&t=&z=15&ie=UTF8&iwloc=&output=embed" 
          style={{ border: '0', width: '100%', height: '384px' }} >
            </iframe>          
          </div>
          



          <div class="col-lg-6">
            <form  method="post" role="form" class="php-email-form"  onSubmit={this.handleSubmit}>
              <div class="row">
                <div class="col-md-6 form-group">
                  <input type="text" name="user_name" class="form-control" id="name" placeholder="Your Name" onChange={this.nameChange} value = {this.state.name} required></input>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" class="form-control" name="user_email" id="email" placeholder="Your Email" onChange={this.emailChange} value = {this.state.email} required></input>
                </div>
              </div>
              <div class="form-group mt-3">
                <input type="text" class="form-control" name="subject" id="subject" onChange={this.subjectChange} placeholder="Subject" value={this.state.subject} required></input>
              </div>
              <div class="form-group mt-3">
                <textarea id="message"    onChange={this.messageChange} class="form-control" name="message" rows="5" placeholder="Message" value = {this.state.feedback} required></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <br></br>
              <div  class="text-center">
                {
                  this.state.loading?<CircularProgress size={60}  /> :
    <Fab
    aria-label="save"
    color="primary"
    type="submit" 
    
  >
    {this.state.success ? <CheckIcon /> : <SendIcon />}
  </Fab>
                }
          
        
    </div>
            </form>


    
          </div>

    
        </div>

      </div>



    </section>



              </main>
              
   

	            </div>
	}
}


ContactUs.PropTypes = {
	books: PropTypes.bool.isRequired,
 }
 /*Book.PropTypes = {
 	b: PropTypes.string
 }
*/
export default withSnackbar(ContactUs);