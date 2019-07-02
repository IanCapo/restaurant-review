import React, { Component } from 'react'
import axios from 'axios'
import ReviewCard from '../../Components/ReviewCard'

export default class RestaurantDetails extends Component {
  state = {
    photo: '',
    imageURL: '',
    reviews: [],
    author_name: '',
    text: '',
    value: ''
  }

  /* fetch image data and reviews */
  fetchImage = (geometry) => {
    let lat = geometry.location.lat
    let lng = geometry.location.lng
    let url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y`
    return axios.get(url)
  }

  replaceResponseURL = (geometry) => {
    let lat = geometry.location.lat
    let lng = geometry.location.lng
    let newURL = `https://maps.googleapis.com/maps/api/streetview?size=300x300&location=${lat},${lng}&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y`
    return newURL
  }

  fetchPlacesDetails = () => {
    let url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.props.data.place_id}&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y`
    return axios.get(url)
  }

  componentDidMount = () => {
    axios.all([this.fetchImage(this.props.data.geometry), this.fetchPlacesDetails()])
      .then(axios.spread((image, reviews) => {
        if (image.data.status === "OK") {
          this.setState({ imageURL: this.replaceResponseURL(this.props.data.geometry) })
        } else {
          this.setState({ imageURL: 'no street view' })
        }
        if (reviews.data.status === "OK") {
          this.setState({ reviews: reviews.data.result.reviews })
        } else {
          console.log('no reviews')
        }
      }))
  }

  /* render reviews */
  renderReviews = (reviews) => {
    return reviews.map((review) => (
      <ReviewCard name={review.author_name} rating={review.rating} text={review.text} />
    ))
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
    let author_name = this.state.author_name
    let text = this.state.text
    let rating = this.state.value
    let newReview = { 'author_name': author_name, 'text': text, 'rating': rating }
    this.setState({
      reviews: [...this.state.reviews, newReview]
    });
  }


  render() {
    let { vicinity, opening_hours } = this.props.data

    function checkIfOpen() {
      let open
      if (opening_hours) {
        if (opening_hours.open_now === true) {
          open = 'open now'
        } else {
          open = 'closed'
        }
      } else {
        open = 'opening hours not available'
      }
      return open
    }

    return (
      <div>
        <img src={this.state.imageURL} />
        <p>{checkIfOpen()}</p>
        <p>{vicinity}</p>
        <h3>Reviews:</h3>
        {this.state.reviews ? this.renderReviews(this.state.reviews) : null}
        <form id="reviewForm" onSubmit={event => this.handleSubmit(event)}>
          <input type='text' name="author_name" value={this.state.author_name} onChange={this.handleChange}></input>
          <input type='text' name="text" value={this.state.text} onChange={this.handleChange}></input>
          <select name="value" value={this.state.value} onChange={this.handleChange}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button>Add review</button>
        </form>
      </div>
    )
  }
}









