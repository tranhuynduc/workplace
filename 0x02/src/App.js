import React, { Component } from 'react';
import logo from './logo.svg';
// import './bootstrap4/css/bootstrap.css';
import './bootstrap4/css/bootstrap.css';
import './App.css';
// import HelloWorld from './HelloWorld.js';
// import GenerateNumber from './GenerateNumber.js';
import Register from './Register.js';
import Register2 from './Register2.js';
// import Login from './Login.js';

class App extends Component {
  constructor(props) {
    console.log('App contructor', props);
    super(props);
    this.state = {
      title: props.title,
      initialNumber: 1,
      isRegisted: false,
      userData: {}
    }
  }

  changeTitle = (newTtile) => {
    this.setState({
      title: newTtile
    })
  }

  onRegisted = (data) => {
    this.setState({
      isRegisted: true,
      userData: data
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <Register2 onRegisted={this.onRegisted.bind(this)} />
        <Register onRegisted={this.onRegisted.bind(this)} />
      </div>
    );
  }
}

export default App
