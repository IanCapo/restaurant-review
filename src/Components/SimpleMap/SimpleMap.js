import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from '../LocationPin'
import AppProvider from '../../AppProvider'

// this.renderRestaurantPins(context.restaurants)

//THIS IS ALSO A COMMENT
console.log('hello world');
class SimpleMap extends Component {



  renderRestaurantPins = (restaurants) => {
    return restaurants.map((restaurant) => (
      <LocationPin lat={restaurant.geometry.location.lat} lng={restaurant.geometry.location.lng} text={restaurant.name} color="green" />
    ))
  }

  render() {

    return (
      <div style={{ height: '100vh', width: '80%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y' }}
          center={context.center}
          defaultZoom={context.zoom}
          onChildMouseEnter={this.onChildMouseEnter}
          onChildMouseLeave={this.onChildMouseLeave}
        >
          <LocationPin
            lat={context.center.lat}
            lng={context.center.lng}
            text="Your location"
            color="red"
          />

          <Consumer>
            { context => (
              console.log('context.restaurants from SimpleMap', context)
              )
            }
          </Consumer>
        </GoogleMapReact>
      </div>


    );
  }
}

export default SimpleMap;
