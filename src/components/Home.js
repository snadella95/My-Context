import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Signup.js";
import Login from './Login.js';
class Home extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path='/' component={Login} />
                    <Route exact path='/signup' component={Signup} />
                </Switch>
            </Router>
        );
    }
}

export default Home;