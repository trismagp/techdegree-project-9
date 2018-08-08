import React, { Component } from 'react';
import  { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import SearchForm from './components/SearchForm';
import Nav from './components/Nav';
import Gallery from './components/Gallery';

export default class App extends Component {

  render() {
    return (
      <Router>
        <div className="container">
          <SearchForm />
          <Nav />
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/topic/geneva+lake" />)} />
            <Route path="/search/:query" render={(props) => <Gallery {...props} key={props.match.params.query} />} />
            <Route path="/topic/:query" render={(props) => <Gallery {...props} key={props.match.params.query} />} />
            <Route render={()=><h1>Page not found</h1> }/>
          </Switch>
        </div>
      </Router>
    );
  }
}