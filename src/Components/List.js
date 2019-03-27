import React, { Component } from 'react'
import ListItem from './ListItem'


export default class List extends Component {

  createList = () => {
    const restaurants = this.props.restaurants
    return restaurants.map((restaurant) => (
      <ListItem name={restaurant.restaurantName} lat={restaurant.lat} lng={restaurant.long} />
    ))
  }

  render() {
    return (
      <div>
        <ul className="List">
          {this.createList()}
        </ul>
      </div >
    )
  }
}   
