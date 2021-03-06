import React, { Component } from 'react';
import { TextField, Button, FormControl, InputLabel, OutlinedInput, Select, MenuItem, LinearProgress } from '@material-ui/core';
import '../App.css';
import ReactDOM from 'react-dom';
import { Link, Redirect } from 'react-router-dom';
import api from '../api/mongoService';

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role: '',
            labelWidth: 0,
            username: '',
            email: '',
            password: '',
            password2: '',
            errors: '',
            redirect: false,
            loading: false

        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const user = {
            role: this.state.role,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };
        this.setState({ loading: false });
        api.register_user(user)
            .then((response) => {
                console.log(response);
                if (response.success) {
                    this.setState({ loading: true });
                    alert("Registered successfully");
                    this.setState({ redirect: true })
                }
                else {
                    this.setState({ errors: response.message });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }

    componentDidMount() {
        if (ReactDOM.findDOMNode(this.InputLabelRef) !== null) {
            this.setState({
                labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
            });
        }
        this.setState({ loading: true });
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({ [name]: value });
    };

    render() {

        if (this.state.redirect) {
            return (<Redirect to="/" />);
        }

        if (!this.state.loading) {
            return (
                <LinearProgress color="primary" />
            )
        }

        return (
            <div className="login-padding">
                <div className="login-div">
                    <div className="login-center-content">
                        <p style={{
                            "fontSize": "24px", "lineHeight": "30px", "letterSpacing": "-0.4px", "fontWeight": "bold",
                        }}>Create an account for <span style={{ "fontSize": "15px" }}>{this.state.role}</span></p>
                        <p style={{ "fontSize": "15px", "fontStyle": "bold" }}>{this.state.errors}</p>
                        <div className="login-textfield">
                            <div>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel
                                        ref={ref => {
                                            this.InputLabelRef = ref;
                                        }}
                                        htmlFor="select-role"
                                    >
                                        Choose role</InputLabel>
                                    <Select
                                        value={this.state.role}
                                        onChange={this.handleInputChange}
                                        input={
                                            <OutlinedInput
                                                name="role"
                                                labelWidth={this.state.labelWidth}
                                                id="select-role"
                                            />
                                        }>
                                        <MenuItem value="" style={{ "fontSize": "13px" }}>None</MenuItem>
                                        <MenuItem value={"Doctor"} style={{ "fontSize": "13px" }}>Doctor</MenuItem>
                                        <MenuItem value={"Patient"} style={{ "fontSize": "13px" }}>Patient</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <TextField
                                id="outlined-email-input"
                                label="User name"
                                value={this.state.username}
                                onChange={this.handleInputChange}
                                type="username"
                                name="username"
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className="login-textfield">
                            <TextField
                                id="outlined-email-input"
                                label="Email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                type="email"
                                name="email"
                                fullWidth
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className="login-textfield">
                            <TextField
                                id="outlined-password-input"
                                label="Password"
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                fullWidth
                                name="password"
                                type="password"
                                margin="normal"
                                variant="outlined"
                            />
                        </div>
                        <div className="login-textfield">
                            <TextField
                                id="outlined-password-input2"
                                label="Confirm Password"
                                value={this.state.password2}
                                onChange={this.handleInputChange}
                                fullWidth
                                type="password"
                                margin="normal"
                                name="password2"
                                variant="outlined"
                            />
                        </div>
                        <Button variant="contained"
                            size="large" color="primary"
                            style={{ "marginTop": "15px", "padding": "15px" }}
                            fullWidth
                            onClick={this.handleSubmit}>
                            <span style={{ "fontStyle": "bold", "fontSize": "13px" }}>Create Account</span></Button>
                    </div>
                </div>
                <div className="signup-footer">Already have an account?
                <Link to="/" style={{ "textDecoration": "none" }}>
                        <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            style={{ "marginLeft": "10px" }}>
                            log in
                        </Button>
                    </Link>
                </div>
            </div >
        );
    }
}

export default Signup;