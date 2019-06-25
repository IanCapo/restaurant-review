import React, { Component } from 'react'
import styled from '@emotion/styled'

export default class LocationPin extends Component {

  render() {
    const CurLocationPin = styled('div')`
    width: 65px;
    height: 15px;
    padding: 5px 10px;
    background-color: ${this.props.color};
    color: black;
    border-radius: 10px 3px 3px 12px;
    transform: translateX(10%);
`
    return (
      <CurLocationPin>
        {this.props.text}
      </CurLocationPin>
    )
  }
}
