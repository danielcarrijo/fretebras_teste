import React from 'react';
import { Route } from 'react-router-dom';

import UserContextProvider from '../context/UserContext';

const UserRoute = ({ component: Component, ...rest }) => {

  return (
    <Route {...rest} render={() => (
        <UserContextProvider>
          <Component {...rest} />
        </UserContextProvider>
      )}
    />
  );
}

export default UserRoute;