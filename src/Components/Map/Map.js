import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from '../LocationPin'
import axios from 'axios'


class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurants: [],
      center: {
        lat: -41.269552,
        lng: 173.286898
      },
      zoom: 11
    };
  }

  componentDidMount = () => {
    // console.log('component did mount');
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.center.lat},${this.state.center.lng}&radius=1500&type=restaurant&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y`)
      .then((response) => {
        console.log(response.data.results)
        //console.log('response.data', response.data);
        this.setState({ restaurants: response.data.results })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  locationFinder = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setState({ center: { lat: lat, lng: lng }, zoom: 11 });
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  // componentDid Mount for fetching data
  componentDidMount() {
    if (navigator.geolocation) {
      this.locationFinder()
    }
  }

  renderRestaurantPins = () => {
    return this.state.restaurants.map((restaurant) => (
      <LocationPin lat={restaurant.geometry.location.lat} lng={restaurant.geometry.location.lng} text={restaurant.name} color="green" />
    ))
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '80%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y' }}
          center={this.state.center}
          defaultZoom={this.state.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          <LocationPin
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text="Your location"
            color="red"
          />
          {this.renderRestaurantPins()}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;