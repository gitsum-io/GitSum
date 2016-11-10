import React from 'react'
import styles from './styles.css'

const Label = React.createClass({
  propTypes: {
    className: React.PropTypes.string,
    for: React.PropTypes.string,
    children: React.PropTypes.oneOfType([
      React.PropTypes.object,
      React.PropTypes.string
    ])
  },
  render() {
    const className = this.props.className || styles.label
    return (
      <label htmlFor={this.props.for} className={`${className}`}>{this.props.children}</label>
    )
  }
})

export default Label
