import React, { Component } from 'react'
import axios from 'axios'
const AppContext = React.createContext()


export default class AppProvider extends Component {
  state = {
    restaurants: [],
    center: {
      lat: -41.2706,
      lng: 173.2840
    },
    addNewRestaurant: (dataFromChild) => {
      const { restaurant } = dataFromChild
      this.setState((state) => ({
        restaurants: [...state.restaurants, restaurant]
      }))
    }
  }

  componentWillMount() {
    var getPosition = function (options) {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }

    getPosition()
      .then((position) => {
        this.setState({ center: { lat: position.coords.latitude, lng: position.coords.longitude } });
        let url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${position.coords.latitude},${position.coords.longitude}&radius=1200&type=restaurant&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y`
        this.getRestaurants(url)
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  getRestaurants = (url) => {
    axios.get(url)
      .then((response) => {
        this.setState({ restaurants: response.data.results })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>
  }
}

export const Consumer = AppContext.Consumer