import React, { Component } from 'react'
import axios from 'axios';
import  GoogleLogin from 'react-google-login';

export default class Login extends Component {

    constructor(props){
        super(props);

        this.state = {

            email: "",
            password: ""
        }
    }
    onInputChanges = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
        e.preventDefault();        
    }
    
    loginGoogel = async (res) => {        
        const user = res.profileObj;
            await axios.post('http://localhost:4000/api/login', {
                email: user.email,                
                password: user.googleId
            }).then( async (a) => {       
               // const resp = JSON.stringify(a.data.err)
                //  eslint-disable-next-line 
                if(a.data.err == true ){
                    const newUser = res.profileObj;
                    await axios.post('http://localhost:4000/api/users', {
                        name: newUser.name,
                        email: newUser.email,
                        tel: newUser.email,                        
                        password: newUser.googleId,
                        googel:true
                    }).then(async (a) => {
                        const resp = JSON.stringify(a.data.m)
                    //  eslint-disable-next-line 
                        if (resp == 1 ){
                            await axios.post('http://localhost:4000/api/login', {
                                email: user.email,                
                                password: user.googleId
                            }).then( async (a) => {
                                console.log(a.data)
                            });
                        } else {
                            window.alert(resp)
                        }
                        

                    });   

                } else {
                    console.log(a.data)
                }        
                
            });      

    }
    onSubmit = async (e) =>{
        e.preventDefault();
        
        await axios.post('http://localhost:4000/api/login', {
            email: this.state.email,
            password: this.state.password
        }).then((a) => {
            console.log(a.data);
        })

    }

    render() {
        
        return (
            <div className="d-flex justify-content-center">
                <div>
                    <br/><br/>
                    <h3>Login</h3>
                    <div>
                        <form onSubmit={this.onSubmit} >
                            <div className="emal form-group">
                                <label htmlFor="email">Email</label>
                                <div >
                                    <input 
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        onChange={this.onInputChanges}
                                    />
                                </div>
                            </div>
                            
                            <div className="password form-group">
                                <label htmlFor="password">Password</label>
                                <div >
                                    <input 
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={this.onInputChanges}
                                    />
                                </div>
                            </div>
                            <div className="createAccount">
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                            <br/>
                            <GoogleLogin
                                clientId="145201608562-9kvft5rbv8ea10rifipqcfralcg81fit.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={this.loginGoogel}
                                onFailure={this.loginGoogel}
                                cookiePolicy={'single_host_origin'}
                            />
                        </form>

                    </div>
                </div>

            </div>    
        )
    }
}