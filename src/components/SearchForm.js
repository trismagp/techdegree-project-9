import React, { Component } from 'react';
import  { withRouter, NavLink } from 'react-router-dom';


class SearchForm extends Component {

  constructor(){
    super();
    this.state = {
      query:""
    };
  }

  // before updating the state query, white spaces are replaced by "+"
  // .split(" ").join("+") works like a replaceAll " " with "+"
  handleInputChange(e) {
    this.setState({query: e.target.value.split(" ").join("+")});
  }

  // on form submit redirects to `/search/${this.state.query}`
  handleSubmit(e) {
    e.preventDefault();
    this.props.history.push(`/search/${this.state.query}`);
    e.currentTarget.reset();
  }

  render() {
    return (
      <div>
        <p>Go back to main page <NavLink to={'/'}>here</NavLink></p>
        <form className="search-form" onSubmit={this.handleSubmit.bind(this)}>
          <input type="search" name="search" placeholder="Search" onChange={this.handleInputChange.bind(this)} required/>
          <button type="submit" className="search-button">
            <svg fill="#fff" height="24" viewBox="0 0 23 23" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </button>
        </form>
      </div>
    );
  }
}


export default withRouter(SearchForm);
