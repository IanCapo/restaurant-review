import React, { Component } from 'react'
import Filter from '../Filter'
import RestaurantItem from '../RestaurantItem'
import AddButton from '../AddButton'
import { Consumer } from '../../AppProvider'

export default class Restaurants extends Component {
  render() {

    return (
      <div>
        <Filter />
        <Consumer>
          {(context) =>
            context.restaurants.map((restaurant) => {
              return (
                <RestaurantItem
                  data={restaurant}
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
