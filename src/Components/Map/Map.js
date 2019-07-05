import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationPin from '../LocationPin'
import { Consumer } from '../../AppProvider'
import NewRestaurantForm from '../NewRestaurantForm'


class SimpleMap extends Component {
  constructor() {
    super()
    this.state = {
      center: {
        lat: 59.95,
        lng: 30.33
      },
      zoom: 11,
      newRestaurantForm: 'no'
    }
  }

  renderRestaurantPins = (restaurants) => {
    return restaurants.map((restaurant) => (
      <LocationPin lat={restaurant.geometry.location.lat} lng={restaurant.geometry.location.lng} text={restaurant.name} color="green" />
    ))
  }

  onMapClick = (target) => {
    let lat = target.y
    let lng = target.x
    this.setState({ newRestaurantForm: 'yes', newRestaurant: { location: { lat: lat, lng: lng } } })
  }

  renderForm = () => {
    let lat = this.state.newRestaurant.location.lat
    let lng = this.state.newRestaurant.location.lng

    console.log(lat, lng)
    return <NewRestaurantForm></NewRestaurantForm>
  }


  render() {
    return (
      <div style={{ height: '100vh', width: '80%' }}>
        <Consumer>
          {(context) => {
            return (
              <GoogleMapReact
                bootstrapURLKeys={{ key: 'AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y' }}
                center={context.center}
                defaultZoom={this.state.zoom}
                onChildMouseEnter={this.onChildMouseEnter}
                onChildMouseLeave={this.onChildMouseLeave}
                onClick={event => this.onMapClick(event)}
              >
                <LocationPin
                  lat={context.center.lat}
                  lng={context.center.lng}
                  text="Your location"
                  color="red"
                />

                {this.renderRestaurantPins(context.restaurants)}

                {this.state.newRestaurantForm === 'yes' ? this.renderForm() : null}

              </GoogleMapReact>)

          }}
        </Consumer>
      </div>
    );
  }
}

export default SimpleMap;