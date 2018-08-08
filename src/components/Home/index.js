import React, { Component } from 'react';
import axios from 'axios';

import SearchForm from '../SearchForm';
import Nav from '../Nav';
import Gallery from '../Gallery';

import './index.css';

const apiKey = require("../../config2.js");

class Home extends Component {
    constructor(props){
      super(props);
      let match = props.match;
      this.state = {
        category: match.params.category,
        images: props.,
        searchStarted: false
      };
      console.log(this.state.category);
    }


  //
  // componentWillMount(){
  //   console.log('componentDidMount ' + this.state.category);
  //   if(this.state.category){
  //     this.fetchImages(this.state.category);
  //   }
  // }

  render(){
    return (
      <div>
        <Gallery images={this.state.images} searchStarted={this.state.searchStarted}/>
      </div>
    );
  }
}

export default Home;
