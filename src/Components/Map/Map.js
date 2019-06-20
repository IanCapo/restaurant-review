import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from '../LocationPin'
import { Consumer } from '../../AppProvider'


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

  renderRestaurantPins = (restaurants) => {
    console.log(restaurants)
    return restaurants.map((restaurant) => (
      <LocationPin lat={restaurant.geometry.location.lat} lng={restaurant.geometry.location.lng} text={restaurant.name} color="green" />
    ))
  }

  render() {
    return (

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
          <Consumer>
            {(context) => {
              this.renderRestaurantPins(context.restaurants)
            }
            }
          </Consumer>
        </GoogleMapReact>
      </div>


    );
  }
}

export default SimpleMap;