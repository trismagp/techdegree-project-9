import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


class Nav extends Component {
  render(){
    return (
      <div>
        <p>Click on the links below or search for other pics <NavLink to={'/search'}>here</NavLink></p>
        <nav className="main-nav">
          <ul>
            <li><NavLink to={'/topic/cheese+fondue'}>Cheese</NavLink></li>
            <li><NavLink to={'/topic/cervin'}>Cervin</NavLink></li>
            <li><NavLink to={'/topic/lavaux'}>Lavaux</NavLink></li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Nav;
