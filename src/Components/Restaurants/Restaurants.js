import React, { Component } from 'react'
import Filter from '../Filter'
import RestaurantItem from '../RestaurantItem'
import AddButton from '../AddButton'
import { Consumer } from '../../AppProvider'

export default class Restaurants extends Component {
  // getAverageRating = (ratings) => {
  //   let totalRatings = ratings.map(rating => { return rating.stars })
  //   let averageRating = (totalRatings.reduce(function (a, b) { return a + b; }, 0)) / ratings.length;
  //   return (averageRating)
  // }
  render() {

    return (

      <div>
        <Filter />
        <Consumer>
          {(context) => context.restaurants.map((restaurant) => {
            return (
              <RestaurantItem
                name={restaurant.name}
                lat={restaurant.geometry.location.lat}
                lng={restaurant.geometry.location.lng}
                averageRating={restaurant.rating} />
            )
          })}
        </Consumer>
        <AddButton />
      </div>

    )
  }
}
