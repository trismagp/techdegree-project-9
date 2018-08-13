import React, { Component } from 'react';
import  { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Gallery from './components/Gallery';




export default class App extends Component {

  // For these two routes:
  //
  // <Route path="/search/:query" render={(props) => <Gallery {...props} key={props.match.params.query} />} />
  // <Route path="/topic/:query" render={(props) => <Gallery {...props} key={props.match.params.query} />} />
  //
  // setting the key equals to "props.match.params.query" will rerender the Gallery component
  // when the path ":query" parameter will change

  render() {
    return (
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/topic/geneva+lake" />)} />
            <Route exact path="/search" component={Gallery} />
            <Route path="/search/:query" render={(props) => <Gallery {...props} key={props.match.params.query} />} />
            <Route path="/topic/:query" render={(props) => <Gallery {...props} key={props.match.params.query} />} />
            <Route render={()=><h1>Page not found</h1> }/>
          </Switch>
        </div>
      </Router>
    );
  }
}
