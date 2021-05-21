import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common.js';
import { Link } from 'react-router-dom'
 
function AuthorDashboard(props) {
  const user = getUser();
 
  // handle click event of logout button
  // WILL COME ON RENDER METHOD       Welcome {user.name}!<br /><br />
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/author-login');
  }
 
  return (
    <div>
      <input type="button" onClick={handleLogout} value="Logout" />

      <Link to="/addQuestion"><button className="marTop25 nextBtn btn pull-left">Add Question</button></Link>
    </div>
  );
}
 
export default AuthorDashboard;