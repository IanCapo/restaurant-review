import React, { Component } from 'react'
import './NewRestaurantForm.css'
import axios from 'axios'
import Button from '../Button'

export default class NewRestaurantForm extends Component {
  constructor() {
    super()
    this.state = {
      restaurant_name: '',
      address: '',
      value: '1',
      restaurant: {
        geometry: { location: { lat: '', lng: '' }, viewport: '' },
        icon: '',
        id: '',
        name: '',
        photos: [''],
        place_id: '',
        plus_code: { compound_code: '', global_code: '' },
        rating: '',
        reference: '',
        scope: '',
        types: [''],
        user_ratings_total: '',
        vicinity: ''
      }
    }
  }

  componentDidMount() {
    axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${this.props.lat},${this.props.lng}&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y`)
      .then((response) => {
        this.setState((state) => ({
          restaurant: { ...state.restaurant, vicinity: response.data.results[0].formatted_address }
        }))
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
    this.setState((state) => ({
      restaurant: { ...state.restaurant, name: state.restaurant_name, geometry: { location: { lat: this.props.lat, lng: this.props.lng }, viewport: '' }, rating: state.value }
    }), () => this.props.getData(this.state));
  }

  render() {

    return (
      <div>
        <form id="restaurantForm" onSubmit={event => this.handleSubmit(event)}>
          <h5>Add a new restaurant</h5>
          <input type='text' name="restaurant_name" placeholder="Restaurant name" value={this.state.restaurant_name} onChange={event => this.handleChange(event)}></input>
          <input type="text" name="address" placeholder={this.state.restaurant.vicinity ? this.state.restaurant.vicinity : 'Street, Zip code, Country'} onChange={event => this.handleChange(event)} />
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
      </div>
    )
  }
}
