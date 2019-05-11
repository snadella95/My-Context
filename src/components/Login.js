import React, { Component } from 'react';
import "../App.css";
import { Link } from 'react-router-dom';
import { TextField, Typography, Button } from '@material-ui/core';
import api from '../api/mongoService.js';


class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            email: "",
            pwd: ""
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });

    }

    handleSubmit(e) {
        const login_details = {
            email: this.state.email,
            password: this.state.pwd
        }
        api.login_request(login_details, function (err, json) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(json);
            }
        })
    }

    render() {
        return (

            <div className="login-padding">
                <div className="login-div">
                    <div className="login-center-content">
                        <p style={{
                            "fontSize": "24px", "lineHeight": "30px", "letterSpacing": "-0.4px", "fontWeight": "bold",
                        }}>Log in into my<span style={{ "fontStyle": "italic", "fontFamily": "eina-bold-italic" }}>context</span></p>
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
                                <span style={{ "color": "#3880ff" }}>
                                <Link to="/signup" style={{ "textDecoration": "none", "marginLeft": "5px" }} >Sign up</Link></span>
                        </div>
                    </div>
                </div>
            </div >

        )
    }
}

export default Login;