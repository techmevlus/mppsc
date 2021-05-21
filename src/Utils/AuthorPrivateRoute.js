import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getToken } from './Common';
 
// handle the private routes
function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => getToken() ? <Component {...props} /> : <Redirect to={{ pathname: '/author-login', state: { from: props.location } }} />}
    />
  )
}
 
export default PrivateRoute;