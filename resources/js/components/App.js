import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import api from './services/api';



const App = () => {
    return (
      <>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </>
    )
  }

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
