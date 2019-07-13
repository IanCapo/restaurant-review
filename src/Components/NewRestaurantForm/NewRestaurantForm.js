import React, { Component } from 'react'
import './NewRestaurantForm.css'
import axios from 'axios'
import Button from '../Button'

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
    let value = this.state.value
    this.setState({
      restaurant: { ...this.state.restaurant, name: restaurant_name, geometry: { location: { lat: this.props.lat, lng: this.props.lng } }, rating: value }
    });

  }

  render() {
    console.log('state', this.state)
    return (
      <div>
        <form id="restaurantForm" onSubmit={event => this.handleSubmit(event)}>
          <h5>Add a new restaurant</h5>
          <input type='text' name="restaurant_name" placeholder="Restaurant name" value={this.state.restaurant_name} onChange={event => this.handleChange(event)}></input>
          <input type="text" name="address" placeholder={this.state.restaurant.vicinity ? this.state.restaurant.vicinity : 'Address'} onChange={event => this.handleChange(event)} />
          <label name="value"> How would you rate this establishment?</label>
          <select type="number" name="value" onChange={event => this.handleChange(event)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <Button type="submit" text="Add restaurant"></Button>
        </form>
        {this.state.restaurant.name ? this.props.action(this.state.restaurant) : null}
        {this.state.restaurant.name ? this.props.getData(this.state.restaurant) : null}
      </div>
    )
  }
}
