import React from 'react'
import styles from './styles.css'

const Button = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    handleClick: React.PropTypes.func,
    type: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string
    ]),
    className: React.PropTypes.string,
    icon: React.PropTypes.object
  },
  render() {
    const className = this.props.className || styles.button
    return (
      <button type={this.props.type} onClick={this.props.handleClick} className={`${className}`}>{this.props.icon}{this.props.children}</button>
    )
  }
})

export default Button
