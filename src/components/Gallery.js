import React, { Component } from 'react';
import axios from 'axios';
import GalleryItem from './GalleryItem';
import { PacmanLoader } from 'react-spinners';


const apiKey = require("../config2.js");

export default class Gallery extends Component {

  constructor(props){
    super(props);

    let match = props.match;

    this.state = {
      images:[],
      query: match.params.query,
      loading: true
    };
  }

  renderNotFound(){
    return (
      <ul>
        <li className="not-found">
          <h3>No Results Found</h3>
          <p>You search did not return any results. Please try again.</p>
        </li>
      </ul>
    );
  }

  // https://www.flickr.com/services/api/misc.urls.html
  renderGalleryItems(images){
    return (
      <div>
        <h2>Results</h2>
        <ul>
          {
            images.map(image=>{
              var {farm, server, id, secret} = image;
              return <GalleryItem key={image.id} image={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`}/>
            })
          }
        </ul>
      </div>
    );
  }

  renderGallery(){
    var {images} = this.state;

    // -- Not Found --
    if(images.length === 0){
      return this.renderNotFound();
    }

    if(images.length > 0){
      return this.renderGalleryItems(images);
    }
  }

  fetchImages(query){
    this.setState({searchStarted:true});

    axios.get('https://api.flickr.com/services/rest/', {
      params: {
        method: "flickr.photos.search",
        api_key: apiKey.default,
        tags:query,
        per_page:24,
        page:1,
        format:"json",
        nojsoncallback:1
      }
    })
    .then(response => {
      setTimeout(
        function(){
          this.setState({
            images:response.data.photos.photo,
            loading:false
          });
        }.bind(this),
        1500
      );
    })
    .catch(error => {
      console.log('Error fetching and parsing data', error);
    });

  }

componentDidMount() {
  this.fetchImages(this.state.query);
}

  render() {
    return (
      <div className="photo-container">
        {
          (this.state.loading)
          ? <div><PacmanLoader  sizeUnit={"px"} size={"150"} color={'#123abc'} loading={this.state.loading} /></div>
          : this.renderGallery()}
      </div>
    );
  }

}
