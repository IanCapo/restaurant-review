import React, { Component } from 'react'
import Filter from '../Filter'
import RestaurantItem from '../RestaurantItem'
import AddButton from '../AddButton'
import AppProvider from '../../AppProvider';

export default class Restaurants extends Component {
  getAverageRating = (ratings) => {
    let totalRatings = ratings.map(rating => { return rating.stars })
    let averageRating = (totalRatings.reduce(function (a, b) { return a + b; }, 0)) / ratings.length;
    return (averageRating)
  }
  render() {
    createListItem = (array) => array.map((restaurant) => (
      <RestaurantItem
        name={restaurant.name}
        lat={restaurant.geometry.location.lat}
        lng={restaurant.geometry.location.lng}
        averageRating={this.getAverageRating(restaurant.ratings)} />
    ))

    return (
      <AppProvider>
        <div>
          <Filter />
          <AppContext.Consumer>
            {(context) => this.createListItem(context.restaurants)}
          </AppContext.Consumer>
          <AddButton />
        </div>
      </AppProvider>
    )
  }
}
