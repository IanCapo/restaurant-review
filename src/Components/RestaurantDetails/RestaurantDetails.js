import React, { Component } from 'react'

export default class RestaurantDetails extends Component {

  render() {
    let { vicinity, opening_hours, photos } = this.props.data
    function checkIfOpen(openingHours) {
      if (openingHours.open_now === true) {
        return 'open now'
      } else {
        return 'closed'
      }
    }

    return (
      <div>
        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y"`} />
        <p>{vicinity}</p>
        <p>{checkIfOpen(opening_hours)}</p>
      </div>
    )
  }
}
