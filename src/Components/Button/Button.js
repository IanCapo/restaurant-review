import React, { Component } from 'react'
import './Button.css'

export default class Button extends Component {
  render() {
    const { text, type } = this.props
    return (
      <div>
        <button type={type}>{text}</button>
      </div>
    )
  }
}
