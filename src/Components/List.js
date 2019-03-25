import React, { Component } from 'react'
import ListItem from './ListItem'


export default class List extends Component {

  render() {
    this.createList = () => {
      const restaurants = this.props.restaurants
      console.log(restaurants)
      if (restaurants) {
        restaurants.map((restaurant) => {
          let restaurantName = restaurant.restaurantName

          return <ListItem name={restaurantName} />
        })
      } else {
        console.log('not working')
      }
    }

    return (
      <div>
        <ul className="List">
          {this.createList()}
        </ul>
      </div>
    )
  }
}   
