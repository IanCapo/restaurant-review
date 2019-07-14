import React, { Component } from 'react'
import './Button.css'

export default class Button extends Component {
  render() {
    const { text, type, className } = this.props
    return (
      <div>
        <button className={className} type={type} onClick={this.props.onClick}>{text}</button>
      </div>
    )
  }
}
