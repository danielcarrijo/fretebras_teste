import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Index from '../index';
import Login from './../index/components/login';
import api from './../services/api'
import { UserContext } from './../context/UserContext';
import UserRoute from './userRoute';

export default function Routes() {

  return (
    <>
    <Switch>
        <UserRoute path='/login' component={Login}/>
        <UserRoute
            exact path='/'
            component={Index}
        />
    </Switch>
  </>
  )
}

