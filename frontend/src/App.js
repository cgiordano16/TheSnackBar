import React, { Component } from 'react'
import './App.css'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import home from './components/home'
import home1 from './components/about'
import catalog from './catalog/catalog'
import { StyledLink } from "./styles";

class App extends Component {
  constructor(props){
    super(props);
    this.state = {apiResponse: ""};
  }


  render(){
  return(
    <div className = "menu_nav">
      <Router>
        <div className = "nav_container">
          <nav>
            <StyledLink to = '/'>Home</StyledLink>
            <StyledLink to = '/catalog'>Catalog</StyledLink>
            <StyledLink to = '/about-us'>About Us</StyledLink>
            <Route exact path = '/' component = {home}/>
            <Route exact path = '/catalog' component = {catalog}/>
            <Route exact path = '/about-us' component = {home1}/>
            </nav>
        </div>
      </Router>
      <p>{this.state.apiResponse}</p>
    </div>
  );
}
}
export default App;