import React from 'react'
import styles from './styles.css'

const Button = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    handleClick: React.PropTypes.func,
    type: React.PropTypes.string,
    children: React.PropTypes.object,
    className: React.PropTypes.string,
    icon: React.PropTypes.func
  },
  render() {
    const className = this.props.className || styles.button
    return (
      <button type={this.props.type} onClick={this.props.handleClick} className={`${className}`}>{this.props.icon}{this.props.text}</button>
    )
  }
})

export default Button
