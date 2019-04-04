import React, { Component } from 'react'
import ListItem from './ListItem'


export default class List extends Component {

  getAverageRating = (ratings) => {
    let totalRatings = ratings.map(rating => { return rating.stars })
    let averageRating = (totalRatings.reduce(function (a, b) { return a + b; }, 0)) / ratings.length;
    return (averageRating)
  }

  createList = () => {
    const restaurants = this.props.restaurants
    console.log(restaurants)
    return restaurants.map((restaurant) => (
      <ListItem
        name={restaurant.restaurantName}
        lat={restaurant.lat}
        lng={restaurant.long}
        averageRating={this.getAverageRating(restaurant.ratings)} />
    ))
  }

  render() {
    return (
      <div>
        <h2 style={{ padding: '20px' }}>Restaurants in this area</h2>
        <ul className="List">
          {this.createList()}
        </ul>
      </div >
    )
  }
}   
