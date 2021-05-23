import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component  url='http://localhost:3001/api/exams_name' {...props} /> : <Redirect to={{ pathname: '/author-login', state: { from: props.location } }} {...props}  />}
    />
  )
}
 
export default PrivateRoute;