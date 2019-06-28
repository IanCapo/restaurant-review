import React, { Component } from 'react'

export default class ReviewCard extends Component {

  render() {

    let { name, rating, text } = this.props

    return (
      <div>
        <h4>{name} - {rating} Stars</h4>
        <p>{text}</p>
      </div>
    )
  }
}
