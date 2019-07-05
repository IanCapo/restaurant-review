import React, { Component } from 'react'

export default class NewRestaurantForm extends Component {
  constructor() {
    super()
    this.state = {
      restaurant_name: ''
    }
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
    // let author_name = this.state.author_name
    // let text = this.state.text
    // let rating = this.state.value
    // let newReview = { 'author_name': author_name, 'text': text, 'rating': rating }
    // this.setState({
    //   reviews: [...this.state.reviews, newReview]
    // });
    console.log(this.state.restaurant_name)
  }
  render() {


    return (
      <div>
        <form>
          <form id="restaurantForm" onSubmit={event => this.handleSubmit(event)}>
            <input type='text' name="restaurant_name" placeholder="Reestaurant name" value={this.state.restaurant_name} onChange={this.handleChange}></input>
            <button>Add restaurant</button>
          </form>
        </form>
      </div>
    )
  }
}
