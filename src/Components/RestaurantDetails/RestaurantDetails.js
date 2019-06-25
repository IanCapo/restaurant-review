import React, { Component } from 'react'

export default class RestaurantDetails extends Component {

  render() {
    let { vicinity, opening_hours, photos } = this.props.data

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
        <img src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0].photo_reference}&key=AIzaSyAdcepCPJjEMQ4uqP1rA3ajDhT68owO__Y"`} />
        <p>{checkIfOpen()}</p>
        <p>{vicinity}</p>
      </div>
    )
  }
}





