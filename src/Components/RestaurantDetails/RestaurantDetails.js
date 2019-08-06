import React, { Component } from 'react'
import axios from 'axios'
import ReviewCard from '../../Components/ReviewCard'
import './RestaurantDetails.css'
import Button from '../Button'
import { uid } from 'react-uid';
import api from '../../api'

export default class RestaurantDetails extends Component {
  state = {
    photo: '',
    imageURL: '',
    reviews: [],
    author_name: '',
    text: '',
    value: '',
  }


  componentDidMount = () => {
    axios.all([this.fetchImage(this.props.data.geometry), this.fetchPlacesDetails()])
      .then(axios.spread((image, reviews) => {
        if (image.data.status === "OK") {
          this.setState({ imageURL: this.replaceResponseURL(this.props.data.geometry) })
        } else {
          this.setState({ imageURL: 'https://us.123rf.com/450wm/pavelstasevich/pavelstasevich1811/pavelstasevich181101028/112815904-stock-vector-no-image-available-icon-flat-vector-illustration.jpg?ver=6' })
        }
        if (reviews.data.status === "OK") {
          this.setState({ reviews: reviews.data.result.reviews })
        } else {
          console.log('no reviews')
        }
      }))
  }

  /* fetch image data and reviews */
  fetchImage = (geometry) => {
    let lat = geometry.location.lat
    let lng = geometry.location.lng
    let url = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${lat},${lng}&key=${api}`
    return axios.get(url)
  }

  replaceResponseURL = (geometry) => {
    let lat = geometry.location.lat
    let lng = geometry.location.lng
    let newURL = `https://maps.googleapis.com/maps/api/streetview?size=200x200&location=${lat},${lng}&key=${api}`
    return newURL
  }

  fetchPlacesDetails = () => {
    let url = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${this.props.data.place_id}&key=${api}`
    return axios.get(url)
  }

  /* render reviews */
  renderReviews = (reviews) => {
    return reviews.map((review) => (
      <ReviewCard name={review.author_name} rating={review.rating} text={review.text} key={uid(review)} />
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
    if (this.state.reviews) {
      this.setState({
        reviews: [...this.state.reviews, newReview], author_name: '', text: '', value: ''
      });
    } else {
      this.setState({
        reviews: [newReview], author_name: '', text: '', value: ''
      });
    }
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
        <img className="streetViewImage" src={this.state.imageURL} alt="streetview" />
        <p className={checkIfOpen()} >{checkIfOpen()}</p>
        <p>{vicinity}</p>
        <h3>Reviews:</h3>
        {this.state.reviews ? this.renderReviews(this.state.reviews) : <p>no reviews yet - be the first</p>}
        <form id="reviewForm" onSubmit={event => this.handleSubmit(event)}>
          <h4>Add a review</h4>
          <input type='text' name="author_name" placeholder="Your name" value={this.state.author_name} onChange={this.handleChange}></input>
          <input type='text' name="text" placeholder="Your review" value={this.state.text} onChange={this.handleChange}></input>
          <div className="select-field">
            <label htmlFor="value">How do you rate this establishment</label>
            <select name="value" value={this.state.value} onChange={this.handleChange}>
              <option value="1">☆</option>
              <option value="2">☆☆</option>
              <option value="3">☆☆☆</option>
              <option value="4">☆☆☆☆</option>
              <option value="5">☆☆☆☆☆</option>
            </select>
          </div>
          <Button type="submit" text="Add review" />
        </form>
      </div>
    )
  }
}









