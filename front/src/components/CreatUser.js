import React, { Component } from 'react'
import axios from 'axios'

export default class CreatUser extends Component {

    state = {
        username: '',
        users: []
    }

    async componentDidMount(){
        const res = await axios.get('http://localhost:4000/api/users');
        this.setState({users: res.data.users});
        console.log(this.state.users);
    }

    render() {
        return (
            <div className ="row">
                <div className="col-md-4">
                    form user
                </div>
                <div className="col-md-8">
                    <ul className="list-group">
                        {
                             this.state.users.map(user => <li>
                                 {user.name}
                             </li>)     
                        }
                    </ul>

                </div>
            </div>
        )
    }
}
