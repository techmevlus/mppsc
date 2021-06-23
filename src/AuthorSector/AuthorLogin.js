import React, { useState } from 'react';
import axios from 'axios';
import { setUserSession } from '../Utils/Common';
 
function AuthorLogin(props) {

  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);

  const [signupStatus,setSignupStatus] = useState('');
  const [authorName,setAuthorName] = useState('');
  const [authorPassword,setAuthorPasswrod] =  useState('');

  //handle Author name  
  const handleAuthorName = (e) =>{
    setAuthorName(e.target.value);
  }

  //handle Author password
  const handleAuthorPassword = (e) => {
    setAuthorPasswrod(e.target.value);
  }

  const handleValidation = () =>{

    //author name validation
    if(authorName == ""){
      setSignupStatus("author name can't be empty");
      return false;
    }

    //author password validation
    else{
      console.log(authorPassword.indexOf(' ')>=0)
      if(authorPassword == ""){
        setSignupStatus("password is required");
        return false;
      }else if(authorPassword.indexOf(' ')>=0){
        setSignupStatus("no white space allowed in password");
        return false;
      }else if(authorPassword.length < 8 || authorPassword.length > 16){
        setSignupStatus("password length should be 8 to 16 character");
        return false;
      }else{
        return true;
      }
    }
  }

  //author signup
  const handleAuthorSignup = () =>{
    console.log(authorName);
    console.log(authorPassword);
    if(handleValidation()){
      const formData = {
        username : authorName,
        password : authorPassword
      }
      console.log(formData)
      if(authorName == null || authorName == "" || authorName == undefined)
        return;
      if(authorPassword == null || authorPassword == "" || authorPassword == undefined)
        return;
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
              setSignupStatus("Author Signup Successful!");
            }else{
              setSignupStatus('Author Signup Failed!');
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


  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <button type="submit" class="btn btn-primary"  value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} >Login</button>&nbsp;
      
      {/* Author Signup */}
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Signup</button><br />
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">New Author Signup</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label>
                Author Name : <input type="text" name="authorName" placeholder="Enter Username" onChange={handleAuthorName} required/>
              </label><br/>
              <label>
                Author Password : <input type="password" name="authorPassword" placeholder="Enter password" onChange={handleAuthorPassword} required/>
              </label>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" class="btn btn-primary" onClick={handleAuthorSignup}>Signup</button><br/>
              {signupStatus}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
 
export default AuthorLogin;