import React, { Component } from 'react';
import "../App.css";
import { Link, Redirect } from 'react-router-dom';
import { TextField, Typography, Button, Card } from '@material-ui/core';
import api from '../api/mongoService';
import Axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            email: "",
            pwd: "",
            redirect: false,
            errors: ''
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });

    }

    componentDidMount() {
        // console.log("I am re rendering because of the change");
    }

    handleSubmit(event) {

        if (this.state.email && this.state.pwd) {

            const login_details = {
                email: this.state.email,
                password: this.state.pwd
            }

            api.login_request(login_details)
                .then((response) => {
                    if (response.success && response.token) {
                        sessionStorage.setItem('jwt', response.token);
                        this.setState({ redirect: true })
                    }
                    else {
                        this.setState({ errors: response.message });
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }

        else {
            this.setState({ errors: "Please fill all the fields" });
            console.log("came here");
        }

    }


    render() {

        if (this.state.redirect) {
            return (<Redirect to="/dashboard" />);
        }

        return (
            <div className="login-padding">
                <div className="login-div">
                    <div className="login-center-content">
                        <p style={{
                            "fontSize": "24px", "lineHeight": "30px", "letterSpacing": "-0.4px", "fontWeight": "bold",
                        }}>Log in into my<span style={{ "fontStyle": "italic", "fontFamily": "eina-bold-italic" }}>context</span></p>
                        <p style={{ "fontSize": "15px", "fontStyle": "bold" }}>{this.state.errors}</p>
                        <div className="login-textfield">
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                type="email"
                                name="email"
                                fullWidth
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className="login-textfield">
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                fullWidth
                                name="pwd"
                                value={this.state.pwd}
                                onChange={this.handleInputChange}
                                type="password"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <Typography className="login-forgot-password">Forgot Password?</Typography>

                        <Button variant="contained" size="large" color="primary"
                            style={{ "marginTop": "15px", "padding": "15px" }}
                            fullWidth
                            onClick={this.handleSubmit}>
                            <span style={{ "fontStyle": "bold", "fontSize": "13px" }}>Log In</span>
                        </Button>
                        <div className="login-placeholder">Don't have an account?
                                <Link to="/signup" style={{ "textDecoration": "none", "marginLeft": "5px", "color": "#3880ff", "fontStyle": "bold" }} >Sign up</Link>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Login;