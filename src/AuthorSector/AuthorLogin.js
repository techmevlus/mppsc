import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
import { set } from 'mongoose';

 
function AuthorLogin(props) {

  const [loading, setLoading] = useState(false);
  const [signup, setSignup] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const [signupStatus,setSignupStatus] = useState('');
  const [authorUsername,setAuthorUsername] = useState('');
  const [authorName,setAuthorName] = useState('');
  const [authorPassword,setAuthorPasswrod] =  useState('');
  const [authorPasswordConfirm,setAuthorPasswrodConfirm] =  useState('');
  const [authorEmail,setAuthorEmail] = useState('');
  const [authorMobile,setAuthorMobile] = useState('');



  //handle Author name  
  const handleAuthorUsername = (e) =>{
    setAuthorUsername(e.target.value);
  }
  
  const handleAuthorName = (e) =>{
    setAuthorName(e.target.value);
  }

  const handleAuthorEmail = (e) =>{
    setAuthorEmail(e.target.value);
  }

  const handleAuthorMobile = (e) =>{
    setAuthorMobile(e.target.value);
  }

  //handle Author password
  const handleAuthorPassword = (e) => {
    setAuthorPasswrod(e.target.value);
  }

  const handleAuthorPasswordConfirm = (e) => {
    setAuthorPasswrodConfirm(e.target.value);
  }


  const handleValidation = () =>{

    var validator = require('validator');

    //author username validation
    if(authorUsername == ""){
      setSignupStatus("enter your username");
      return false;
    }else if(authorUsername.indexOf(' ')>=0){
      setSignupStatus("space character not allowed in username");
      return false;
    }

    //author name validation
    else{
      if(authorName == ""){
        setSignupStatus("enter your name");
        return false;
      }
      

      //email validation
      else{
        if (authorEmail == "") {
          setSignupStatus("enter your email address");
          return false;
        }else if(!validator.isEmail(authorEmail)){
          setSignupStatus("invalid email");
          return false;
        }
        
        //author mobile validation
        else{
          if(authorMobile == ""){
            setSignupStatus("enter mobile number")
            return false;
          }else if(!validator.isMobilePhone(authorMobile) || authorMobile.length !== 10){
            setSignupStatus("invalid mobile number");
            return false;
          }

          //password validation
          else{
            if(authorPassword == ""){
              setSignupStatus("Password is required");
              return false;
            }else if(authorPassword.indexOf(' ')>=0){
              setSignupStatus("No white spaces allowed in password");
              return false;
            }else if(authorPassword.length < 8 || authorPassword.length > 16){
              setSignupStatus("Password length should be 8 to 16 character");
              return false;
            }else if(authorPassword !== authorPasswordConfirm ){
              setSignupStatus("Password did not match");
              return false;
            }
    
            //everything is alright 
            else{
              return true;
            }
        }
        }
      }
    }
  }

  //author signup
  const handleAuthorSignup = () =>{
    console.log(authorName);
    console.log(authorPassword);
    if(handleValidation()){
      const formData = {
        authorUsername : authorUsername,
        authorPassword : authorPassword,
        authorName: authorName,
        authorEmail: authorEmail,
        authorMobile: authorMobile,
      }
      console.log(formData)
      fetch('http://localhost:3001/api/authorSignup', { 
              method: 'post',
              headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json'
                  
              },
              body: JSON.stringify(formData)
          })
          .then(res=>{
            console.log(res)
            if(res.ok==true){
              setSignupStatus("Signup Successful!");
              setSignup(!signup);
              alert("Signup Successfull!")
            }else{
              setSignupStatus('Signup Failed!');
            }
          })
    }
  }
 
  // handle button click of login form
  const handleLogin = () => {
    setError(null);
    setLoading(true);
    axios.post('http://localhost:3001/author/signin', { username: username.value, password: password.value }).then(response => {
      setLoading(false);
      setUserSession(response.data.token, response.data.user);
      props.history.push('/author-dashboard');
    }).catch(error => {
      setLoading(false);
      if (error.response.status === 401) setError(error.response.data.message);
      else setError("Something went wrong. Please try again later.");
    });
  }


  const showSignup = () => {
   
    setSignup(!signup);
   
  }

  
 


  return (
    <div>
<section class="container container-sm shadow" style={{ borderRadius:"5px", marginTop:"45px", padding:"50px", paddingTop:"50px", maxWidth:"600px", paddingBottom:"50px", marginBottom:"80px"}}> 
<div class=" d-flex justify-content-center" style={{paddingBottom:"50px"}} >
<img  class ="logo_animation" src="assets/img/M_logo.jpeg" style={{  borderRadius:"50%"}}  alt="..."></img>

</div>
{signup ? (<div >
          

            <div class="form-floating mb-3">
               <input type="text" name="authorUsername" placeholder="Enter Username" onChange={handleAuthorUsername} class="form-control" id="floatingAthorUsername"/>
               <label for="floatingInput">Username</label>
             </div>
            
            <div class="form-floating mb-3">
               <input type="text" name="authorName" placeholder="Enter Name" onChange={handleAuthorName} class="form-control" id="floatingAuthorName"/>
               <label for="floatingInput">Name</label>
             </div>

           <div class="form-floating mb-3">
               <input type="text" name="authorEmail" placeholder="Enter Email" onChange={handleAuthorEmail} class="form-control" id="floatingAuthorEmail"/>
               <label for="floatingInput">Email </label>
             </div>

             <div class="form-floating mb-3">
               <input type="text" name="authorMobile"  placeholder="Enter Mobile No." onChange={handleAuthorMobile} class="form-control" id="floatingAuthorMobile"/>
               <label for="floatingInput">Mobile </label>
             </div>

             <div class="form-floating mb-3">
               <input type="password" name="authorPassword" placeholder="Enter password" onChange={handleAuthorPassword} class="form-control" id="floatingAuthorPassword" />
               <label for="floatingPassword">Password</label>
           </div>

           <div class="form-floating">
               <input type="password" name="authorPasswordConfirm" placeholder="Confirm password" onChange={handleAuthorPasswordConfirm} class="form-control" id="floatingAuthorPasswordConfirm" />
               <label for="floatingPasswordConfirm"> Confirm Password</label>
           </div>

           {signupStatus && <><small style={{ color: 'red' }}>{signupStatus}</small><br /></>}<br />
           <br/>
           <button type="submit" class="btn btn-primary"  value={loading ? 'Loading...' : 'Sign Up'} onClick={handleAuthorSignup} disabled={loading} >   Sign Up</button>&nbsp;
           <span style={{color:'blue'}}  onClick={showSignup} ><a> Already have an account ? Click here </a> </span><br />
       
           
         </div>

        ) :  
        <section>


        <div class="form-floating mb-3">
    <input type="text" {...username} class="form-control" id="floatingInput" placeholder="name@example.com"/>
    <label for="floatingInput">Username</label>
  </div>
  <div class="form-floating">
    <input type="password" {...password} class="form-control" id="floatingPassword" placeholder="Password"/>
    <label for="floatingPassword">Password</label>
  </div> 
  <br/>
  {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
  {/*<div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>*/}
  <button type="submit" class="btn btn-primary"  value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} >   Login</button>&nbsp;
  <span style={{color:'blue'}}  onClick={showSignup} ><a> Don't  have an account ? Create here </a> </span><br />
       
    

  
  
        </section>
        }
 </section>

    
     
      
      
   
 
    
      
      {/* Author Signup */}
   
   
      
       
<br></br>



    </div>
  )
}
 
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);
 
  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}
 
export default (AuthorLogin);