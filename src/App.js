import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AniSync from './AniSync';
//import StepSeq from './StepSeq';

 // TODO: Get Router to work. 
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <AniSync/>
      </div>
    );
  }
}