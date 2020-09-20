import axios from 'axios';
import React, { Component } from 'react'

export default class CreateNote extends Component {
    constructor(props){
        super(props)
                    
        this.onSubmit = this.onSubmit.bind(this);
    }
    onSubmit = async(e) =>{
        const token = localStorage.getItem("Authorized")  
        e.preventDefault();
        await axios.get('http://localhost:4000/api/users/' + token)
        .then((a) =>{
            console.log(a.data)
        })
    }   

    render() {
        
        return (            
            <div>
                <button type="submit" onClick={this.onSubmit}>User</button>            
            </div>
        )
    }
}
