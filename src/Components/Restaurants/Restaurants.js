import React, { Component } from 'react'
import Filter from '../Filter'
import RestaurantItem from '../RestaurantItem'
import Button from '../Button'
import { Consumer } from '../../AppProvider'
import './Restaurants.css'
import NewRestaurantForm from '../NewRestaurantForm'
import { uid } from 'react-uid';


export default class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterOption: 'all',
      showForm: 'no'
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
          averageRating={restaurant.rating ? Math.round(restaurant.rating) : '/'}
          key={uid(restaurant)}
        />
      )
    }))
  }

  childHandler = () => {
    this.setState({ showForm: 'no' });
  }

  render() {
    return (
      <div className="scrollable">
        <Filter action={event => this.setState({ filterOption: event })} />
        <Consumer>
          {(context) =>
            this.filterRestaurants(context.restaurants)
          }
        </Consumer>
        <Button type="text" text="Add new Restaurant" onClick={event => this.setState({ showForm: 'yes' })} />
        {this.state.showForm === 'yes' ?
          <Consumer>
            {(context) =>
              <NewRestaurantForm getData={context.addNewRestaurant} action={event => this.childHandler()} closeForm={event => this.childHandler()} />
            }
          </Consumer> : null}
      </div>
    )
  }
}
