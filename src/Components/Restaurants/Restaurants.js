import React, { Component } from 'react'
import Filter from '../Filter'
import RestaurantItem from '../RestaurantItem'
import AddButton from '../AddButton'
import { Consumer } from '../../AppProvider'


export default class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOption: 'all'
    };
  }

  filterRestaurants = (restaurants) => {
    let filterOption = this.state.filterOption
    let filterFunction


    if (filterOption === 'all') {
      filterFunction = restaurant => true
    } else {
      filterFunction = restaurant => Math.round(restaurant.rating) >= filterOption
    }

    return (restaurants.filter(filterFunction).map((restaurant) => {
      return (
        <RestaurantItem
          data={restaurant}
          name={restaurant.name}
          lat={restaurant.geometry.location.lat}
          lng={restaurant.geometry.location.lng}
          averageRating={restaurant.rating} />
      )
    })
    )
  }

  render() {
    return (
      <div class="scrollable">
        <Filter action={event => this.setState({ filterOption: event })} />
        <Consumer>
          {(context) =>
            this.filterRestaurants(context.restaurants)}
        </Consumer>
        <AddButton />
      </div>
    )
  }
}
