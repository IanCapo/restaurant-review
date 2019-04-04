import React, { Component } from 'react'
import styled from '@emotion/styled'


const RestLocationPin = styled('div')`
    width: 65px;
    height: 15px;
    padding: 5px 10px;
    background-color: green;
    color: white;
    border-radius: 10px 3px 3px 12px;
    transform: translateX(10%);
`

export default class RestaurantLocationPin extends Component {
  render() {
    return (
      <RestLocationPin>
        {this.props.text}
      </RestLocationPin>
    )
  }
}
