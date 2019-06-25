import React, { Component } from 'react'

export default class ListItem extends Component {
  render() {
    return (
      <div>
        <li>{this.props.name} ({this.props.averageRating})</li>
      </div>
    )
  }
}
