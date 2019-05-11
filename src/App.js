import React, { Component } from 'react';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Home from './components/Home.js';



class App extends Component {
  render() {

    const THEME = createMuiTheme({
      typography: {
        fontFamily: 'eina-semi-bold'
      },
      palette: {
        primary: {
          main: '#3880ff'
        },
        secondary: {
          main: '#474f5a'
        }
      }
    })

    return (
      <MuiThemeProvider theme={THEME}>
        <div className="App">
          <Home />
        </div>
      </MuiThemeProvider >
    );
  }
}

export default App;
