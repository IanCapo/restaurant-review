import React, { Component } from 'react'
import '../LocationPin.css'

export default class LocationPin extends Component {

  render() {
    return (
      <div className={`${this.props.color} locationPin`}>
        <div className="nameTag hidden">{this.props.text}</div>
      </div>
    )
  }
}
