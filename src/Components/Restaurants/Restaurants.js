import React, { Component } from 'react'
import Filter from '../Filter'
import RestaurantItem from '../RestaurantItem'
import AddButton from '../AddButton'

export default class Restaurants extends Component {
  getAverageRating = (ratings) => {
    let totalRatings = ratings.map(rating => { return rating.stars })
    let averageRating = (totalRatings.reduce(function (a, b) { return a + b; }, 0)) / ratings.length;
    return (averageRating)
  }
  render() {
    let restaurants = this.props.restaurant.map((restaurant) => (
      <RestaurantItem
        name={restaurant.restaurantName}
        lat={restaurant.lat}
        lng={restaurant.long}
        averageRating={this.getAverageRating(restaurant.ratings)} />
    ))

    return (
      <div>
        <Filter />
        {restaurants}
        <AddButton />
      </div>
    )
  }
}
