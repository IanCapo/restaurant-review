import React, { Component } from 'react'
import './ReviewCard.css'

export default class ReviewCard extends Component {

  render() {

    let { name, rating, text } = this.props

    return (
      <div>
        <p className="name">{name} - {rating} Stars</p>
        <p className="review">{text}</p>
      </div>
    )
  }
}
