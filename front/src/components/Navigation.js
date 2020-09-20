import React, { Component } from 'react'
import {Link} from 'react-router-dom'


export default class Navigation extends Component {
    constructor(props){
        super(props);       
        this.state = {
            login : localStorage.getItem("Authorized")  
        }
    }
    onSubmit = async(e) =>{
        localStorage.removeItem("Authorized") 
                 
    }   
    render() {
        if(!this.state.login){
            return (
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <div className="container">                    
                    <Link className="navbar-brand" to="/">
                        NotesApp
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/user">Create User</Link>
                            </li>                                               
                        </ul>
                    </div>
                  </div>
                </nav>
            )
        }
        return(
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                  <div className="container">                    
                    <Link className="navbar-brand" to="/">
                        NotesApp
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">Create Notes</Link>
                            </li>                            
                            <li className="nav-item">
                                <a className="nav-link" href="/" onClick={this.onSubmit}>logaut</a>
                            </li>                       
                        </ul>
                    </div>
                  </div>
                </nav>
        )

        
    }
}
