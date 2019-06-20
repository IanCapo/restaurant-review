import React, { Component } from 'react'
import axios from 'axios'
const AppContext = React.createContext()

export default class AppProvider extends Component {
  state = {
    restaurants: [],
    center: {
      lat: -41.269552,
      lng: 173.286898
    }
  }
  componentDidMount = () => {
    axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.center.lat},${this.state.center.lng}&radius=1500&type=restaurant&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y`)
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



