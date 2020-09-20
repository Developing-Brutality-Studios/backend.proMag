import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import Navigation from './components/Navigation'
import CreateUser from './components/CreatUser'
import CreateNote from './components/CreateNote'
import Login from './components/Login'
const login = localStorage.getItem("Authorized")

function App() {   
    var home = CreateNote ;

    if (!login){
       home = Login
    }
    
  return (
    <Router>
      <Navigation/>
        <Route path="/"  exact component={home}/>        
        <Route path="/user" component={CreateUser}/> 

    </Router>
  );
}

export default App;
