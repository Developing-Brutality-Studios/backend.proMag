import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navigation from './components/Navigation'
import CreateUser from './components/CreatUser'
import CreateNote from './components/CreateNote'
import Login from './components/Login'

function App() {
  return (
    <Router>
      <Navigation/>

        <Route path="/"  exact component={Login}/>
        <Route path="/edit/:id" component={CreateNote}/>
        <Route path="/create" component={CreateNote}/>
        <Route path="/user" component={CreateUser}/> 

    </Router>
  );
}

export default App;
