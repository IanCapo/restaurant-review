import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import CurrentLocationPin from './CurrentLocationPin'
import RestaurantLocationPin from './RestaurantLocationPin'

class SimpleMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: -41.269552,
        lng: 173.286898
      },
      zoom: 11
    };
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
  //
  // renderPins = () => {
  //   return this.props.restaurants.map((restaurant) => (
  //     console.log(restaurant.lat, restaurant.long, restaurant.restaurantName),
  //     <RestaurantLocationPin lat={restaurant.lat} lng={restaurant.long} text={restaurant.restaurantName} />
  //   ))
  // }


  render() {
    let pins = this.props.restaurants.map((restaurant) => (
      console.log(restaurant.lat, restaurant.long, restaurant.restaurantName),
      <RestaurantLocationPin lat={restaurant.lat} lng={restaurant.long} text={restaurant.restaurantName} />
    ))
    console.log(pins);
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
          <CurrentLocationPin
            lat={this.state.center.lat}
            lng={this.state.center.lng}
            text="Your location"
          />
          {pins}
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
