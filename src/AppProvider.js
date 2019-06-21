import React, { Component } from 'react'
import axios from 'axios'
const AppContext = React.createContext()


//THIS IS A COMMENT

export default class AppProvider extends Component {
  state = {
    restaurants: [],
    center: {
      lat: -41.2706,
      lng: 173.2840
    }
  }
  componentDidMount = () => {
    if (navigator.geolocation) {
      this.locationFinder()
      console.log(this.state.center)
      axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.center.lat},${this.state.center.lng}&radius=1500&type=restaurant&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y`)
        .then((response) => {
          this.setState({ restaurants: response.data.results })
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }

  locationFinder = () => {
    console.log(this.state.center)
    navigator.geolocation.getCurrentPosition(
      position => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.setState({ center: { lat: lat, lng: lng }, zoom: 11 });
        console.log(this.state.center)
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }

  render() {
    return <AppContext.Provider value={this.state}>
      {this.props.children}
    </AppContext.Provider>
  }
}

export const Consumer = AppContext.Consumer
