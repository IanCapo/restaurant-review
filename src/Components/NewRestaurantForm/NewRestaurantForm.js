import React, { Component } from 'react'
import './NewRestaurantForm.css'
import axios from 'axios'

export default class NewRestaurantForm extends Component {
  constructor() {
    super()
    this.state = {
      restaurant_name: '',
      restaurant: {
        geometry: {
          location: {
            lat: '',
            lng: ''
          }
        },
        name: '',
        vicinity: '',
      }
    }
  }

  componentDidMount() {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.lat},${this.props.lng}&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y`)
      .then((response) => {
        this.setState({ restaurant: { vicinity: response.data.results[0].formatted_address } })
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* handling the submit of a new review  */
  handleChange = (event) => {
    let target = event.target
    let name = target.name
    let value = target.value
    this.setState({
      [name]: value
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    let restaurant_name = this.state.restaurant_name
    this.setState({
      restaurant: { ...this.state.restaurant, name: restaurant_name, geometry: { location: { lat: this.props.lat, lng: this.props.lng } } }
    });

  }

  render() {
    console.log('props', this.props)
    return (
      <div>
        <form id="restaurantForm" onSubmit={event => this.handleSubmit(event)}>
          <input type='text' name="restaurant_name" placeholder="Restaurant name" value={this.state.restaurant_name} onChange={event => this.handleChange(event)}></input>
          <input type="text" name="address" placeholder={this.state.restaurant.vicinity ? this.state.restaurant.vicinity : 'Address'} onChange={event => this.handleChange(event)} />
          <button type="submit">Add restaurant</button>
        </form>
        {this.state.restaurant.name ? this.props.action(this.state.restaurant) : null}
        {this.state.restaurant.name ? this.props.getData(this.state.restaurant) : null}
      </div>
    )
  }
}
