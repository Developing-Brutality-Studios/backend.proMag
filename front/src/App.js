import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom' 
import 'bootstrap/dist/css/bootstrap.min.css';

import Navigation from './components/Navigation'
import Home from './components/Home'
import Login from './components/Login'
import CreateUser from './components/CreateUser'

function App() {
  return (
    <Router>
      <Navigation/>

      <Route path="/" exact component={Login} />
      <Route path="/Home" component={Home} />
      <Route path="/createUser" component={CreateUser} />

    </Router>
  );
}

export default App;
