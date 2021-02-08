import React, { createContext, useState, useEffect } from 'react';
import Loading from './../Loading';

import api from '../services/api';

export const UserContext = createContext();

const UserContextProvider = ({ children })  => {

  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('pineapple.jwt');

    if(token){
      api.get('/me', { headers: { Accept: 'application/json', Authorization: `Bearer ${ token }` } }).then(response => {
        if(response.data){
          setToken(token);
          setUser(response.data);
          setAuthenticated(true);
          setLoading(false);
        }
      }).catch(error => {
        console.log(error.response);
        switch(error.response.status){
          case 401:
            localStorage.removeItem('token');
            break;
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  if(loading){
    return <Loading />;
  }

  return (
    <UserContext.Provider value={{ authenticated, token, user }}>
      { children }
    </UserContext.Provider>
  );
}

export default UserContextProvider;
