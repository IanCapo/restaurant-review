import React, { Component } from 'react'
import styled from '@emotion/styled'


const CurLocationPin = styled('div')`
    width: 65px;
    height: 15px;
    padding: 5px 10px;
    background-color: red;
    color: white;
    border-radius: 10px 3px 3px 12px;
    transform: translateX(10%);
`

export default class CurrentLocationPin extends Component {
  render() {
    return (
      <CurLocationPin>
        {this.props.text}
      </CurLocationPin>
    )
  }
}
