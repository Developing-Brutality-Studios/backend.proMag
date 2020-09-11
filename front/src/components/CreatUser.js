import React, { Component } from 'react'
import axios from 'axios'

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
    let valid = true;

    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
        val.length > 0 && (valid = false);
    });

    // validate the form was filled out
    Object.values(rest).forEach(val => {
        val === null && (valid = false);
    });

    return valid;
};

export default class CreateUser extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            tel: null,
            email: null,
            password: null,
            formErrors: {
                name: "",
                tel: "",
                email: "",
                password: ""
            }
        };
    }


    onSubmit = async (e) => {
        e.preventDefault();
        if (formValid(this.state)) {
            await axios.post('http://localhost:4000/api/users', {
                name: this.state.name,
                email: this.state.email,
                tel: this.state.tel,
                password: this.state.password
            }).then((a) => {
                console.log(a.data)
            });
        } else {
            console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        }


    }
    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        e.preventDefault();
        const { name, value } = e.target;
        let formErrors = { ...this.state.formErrors };

        switch (name) {
            case "name":
                formErrors.name =
                    value.length < 3 ? "minimum 3 characaters required" : "";
                break;
            case "tel":
                formErrors.tel =
                    value.length < 8 ? "minimum 8 characaters required" : "";
                break;
            case "email":
                formErrors.email = emailRegex.test(value)
                    ? ""
                    : "invalid email address";
                break;
            case "password":
                formErrors.password =
                    value.length < 6 ? "minimum 6 characaters required" : "";
                break;
            default:
                break;
        }

        this.setState({ formErrors, [name]: value });
    }


    render() {
        const { formErrors } = this.state;
        return (


            <div className="d-flex justify-content-center">
                <div>
                    <h3>Create New User</h3>
                    <div>
                        <form onSubmit={this.onSubmit} noValidate>
                            <div className="name form-group">
                                <label htmlFor="name">Name</label>
                                <div id="exampleInputEmail1" aria-describedby="emailHelp">
                                    <input
                                        className={formErrors.name.length > 0 ? "error" : null}
                                        placeholder="Name"
                                        type="text"
                                        name="name"
                                        noValidate
                                        onChange={this.onInputChange}
                                    />
                                </div>
                                {formErrors.name.length > 0 && (
                                    <small id="emailHelp" className="errorMessage form-text text-muted">{formErrors.name}</small>
                                )}
                            </div>

                            <div className="tel form-group">
                                <label htmlFor="tel">Tel</label>
                                <div id="exampleInputEmail1" aria-describedby="emailHelp">
                                    <input
                                        className={formErrors.tel.length > 0 ? "error" : null}
                                        placeholder="Last Name"
                                        type="text"
                                        name="tel"
                                        noValidate
                                        onChange={this.onInputChange}
                                    />
                                </div>
                                {formErrors.tel.length > 0 && (
                                    <small id="emailHelp" className="errorMessage form-text text-muted">{formErrors.tel}</small>
                                )}
                            </div>
                            <div className="email form-group">
                                <label htmlFor="email">Email</label>
                                <div id="exampleInputEmail1" aria-describedby="emailHelp">
                                    <input
                                        className={formErrors.email.length > 0 ? "error" : null}
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        noValidate
                                        onChange={this.onInputChange}
                                    />
                                </div>

                                {formErrors.email.length > 0 && (
                                    <small id="emailHelp" className="errorMessage form-text text-muted">{formErrors.email}</small>
                                )}
                            </div>
                            <div className="password form-group">
                                <label htmlFor="password">Password</label>
                                <div id="exampleInputEmail1" aria-describedby="emailHelp">
                                    <input
                                        className={formErrors.password.length > 0 ? "error" : null}
                                        placeholder="Password"
                                        type="password"
                                        name="password"
                                        noValidate
                                        onChange={this.onInputChange}
                                    />
                                </div>
                                {formErrors.password.length > 0 && (
                                    <small id="emailHelp" className="errorMessage form-text text-muted">{formErrors.password}</small>
                                )}
                            </div>
                            <div className="createAccount">
                                <button type="submit" className="btn btn-primary">Create Account</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}
