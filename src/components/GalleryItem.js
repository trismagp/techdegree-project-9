import React, { Component } from 'react';

class GalleryItem extends Component {
  render() {
    return (
        <li>
          <img src={this.props.image} alt=""/>
        </li>
    );
  }
}

export default GalleryItem;
