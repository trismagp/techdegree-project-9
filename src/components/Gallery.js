import React, { Component } from 'react';
import axios from 'axios';
import GalleryItem from './GalleryItem';
import SearchForm from './SearchForm';
import Nav from './Nav';
import { BeatLoader } from 'react-spinners';

var apiKey = require("../config.js");


export default class Gallery extends Component {

  constructor(props){
    super(props);

    let match = props.match;
    let queryParameter = match.params.query; // getting the :query parameter from the Route path
    this.state = {
      apiKeyNotFound:false,
      images:[],
      query: queryParameter ? queryParameter : "",
      loading: true,
      isSearchUrl:match.path.indexOf("/search")>=0
    };
  }

  // display if no pictures where found
  renderNotFound(){
    return (
      (this.state.query !== "")
      ? (
          <ul>
            <li className="not-found">
              <h3>No Results Found</h3>
              <p>You search did not return any results. Please try again.</p>
            </li>
          </ul>
        )
      : (
        <ul>
          <li className="not-found">
            <h3>Search for fabulous pics in Flickr</h3>
          </li>
        </ul>
      )
    );
  }

  // display while fetching images from flickr
  renderLoader(){
    return (
      <ul>
        <li className="not-found">
          <h1>Loading</h1>
          <BeatLoader color={'#123abc'} loading={this.state.loading} />
        </li>
      </ul>
    );
  }

  // displaying images in gallery
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

  // displaying gallery
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

  // while the images are being fetched, displays the loader, then the images
  renderPhotos(){
    return(
      (this.state.loading)
      ? this.renderLoader()
      : this.renderGallery()
    )
  }

  // displays a error message for the api key
  renderApiKeyNotFound(){
    return(
      <ul>
        <li className="not-found">
          <h3>API key error</h3>
          <p>Please check the config file in <b>src</b> folder</p>
        </li>
      </ul>
    )
  }

  fetchImages(query){

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
      var { photo } = response.data.photos;

      if (photo) {
        // setting a 800ms timeout to have a smoother transition
        // between the loader and the gallery display
        setTimeout(
          function(){
            this.setState({
              images:photo,
              loading:false
            });
          }.bind(this),
          800
        );
      }
    })
    .catch(error => {
      this.setState({apiKeyNotFound:true});
    });

  }

  componentDidMount() {
    if(this.state.query!==""){
      this.fetchImages(this.state.query);
    }else{
      this.setState({
        loading:false
      });
    }
  }

  render() {
    return (
      <div>
        {
          (this.state.isSearchUrl)
          ? <SearchForm />
          : <Nav />
        }
        <div className="photo-container">
          {
            (this.state.apiKeyNotFound)
            ? this.renderApiKeyNotFound()
            : this.renderPhotos()
          }
        </div>
      </div>
    );
  }
}
