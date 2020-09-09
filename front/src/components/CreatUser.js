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
            <div className="row">
                <div className="col-md-4">
                    <div className="card card-body">
                        <h3>Create New User</h3>
                        <form onSubmit={this.onSubmit} noValidate>
                            <div className="name">
                                <label htmlFor="name">Name</label>
                                <input
                                    className={formErrors.name.length > 0 ? "error" : null}
                                    placeholder="First Name"
                                    type="text"
                                    name="name"
                                    noValidate
                                    onChange={this.onInputChange}
                                />
                                {formErrors.name.length > 0 && (
                                    <span className="errorMessage">{formErrors.name}</span>
                                )}
                            </div>
                            <div className="tel">
                                <label htmlFor="tel">Tel</label>
                                <input
                                    className={formErrors.tel.length > 0 ? "error" : null}
                                    placeholder="Last Name"
                                    type="text"
                                    name="tel"
                                    noValidate
                                    onChange={this.onInputChange}
                                />
                                {formErrors.tel.length > 0 && (
                                    <span className="errorMessage">{formErrors.tel}</span>
                                )}
                            </div>
                            <div className="email">
                                <label htmlFor="email">Email</label>
                                <input
                                    className={formErrors.email.length > 0 ? "error" : null}
                                    placeholder="Email"
                                    type="email"
                                    name="email"
                                    noValidate
                                    onChange={this.onInputChange}
                                />
                                {formErrors.email.length > 0 && (
                                    <span className="errorMessage">{formErrors.email}</span>
                                )}
                            </div>
                            <div className="password">
                                <label htmlFor="password">Password</label>
                                <input
                                    className={formErrors.password.length > 0 ? "error" : null}
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    noValidate
                                    onChange={this.onInputChange}
                                />
                                {formErrors.password.length > 0 && (
                                    <span className="errorMessage">{formErrors.password}</span>
                                )}
                            </div>
                            <div className="createAccount">
                                <button type="submit">Create Account</button>
                                <small>Already Have an Account?</small>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}
