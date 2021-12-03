import React, { Component } from 'react'
import './App.css';
import GetList from './Components/GetList';
import Nav from './Components/shared/Nav';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieDetail from './Components/MovieDetail';
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav></Nav>
          <Switch>
            <Route path="/" exact component={GetList} />
            <Route path="/MovieDetail/:id" component={MovieDetail}></Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
