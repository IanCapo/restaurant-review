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
      zoom: 15,
      newPin: 'no',
      showForm: 'no'
    }
  }

  renderRestaurantPins = (restaurants) => {
    // console.log('restaurants', restaurants)
    return restaurants.map((restaurant) => (
      <LocationPin lat={restaurant.geometry.location.lat} lng={restaurant.geometry.location.lng} text={restaurant.name} color="green" key={restaurant.id} />
    ))
  }

  onMapClick = (target) => {
    let lat = target.lat
    let lng = target.lng
    this.setState({ newPin: 'yes', showForm: 'yes', newRestaurant: { location: { lat: lat, lng: lng } } })
  }

  addNewPin = () => {
    let lat = this.state.newRestaurant.location.lat
    let lng = this.state.newRestaurant.location.lng

    return <LocationPin lat={lat} lng={lng} color="orange" hover="yes" />
  }

  childHandler = (dataFromChild) => {
    if (dataFromChild) {
      this.setState({ showForm: 'no' })
    }
  }

  render() {

    return (
      <div style={{ height: '100vh', width: '70%' }}>
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
                  key="myLocation"
                />

                {this.renderRestaurantPins(context.restaurants)}

                {this.state.newPin === 'yes' ? this.addNewPin() : null}

              </GoogleMapReact>
            )
          }}

        </Consumer>
        <Consumer>
          {(context) => {
            if (this.state.showForm === 'yes') {
              return <NewRestaurantForm lat={this.state.newRestaurant.location.lat} lng={this.state.newRestaurant.location.lng} action={this.childHandler} getData={context.addNewRestaurant} />
            }
          }}
        </Consumer>

      </div>
    );
  }
}

export default SimpleMap;