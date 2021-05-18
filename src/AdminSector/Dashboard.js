import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common.js';
 
function Dashboard(props) {
  const user = getUser();
 
  // handle click event of logout button
  // WILL COME ON RENDER METHOD       Welcome {user.name}!<br /><br />
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
 
  return (
    <div>

      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}
 
export default Dashboard;