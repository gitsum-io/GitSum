import React from 'react'
import styles from './styles.css'

const ClickMask = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    handleClick: React.PropTypes.func,
    className: React.PropTypes.string
  },
  render() {
    const className = `${(this.props.active ? styles.maskActive : styles.mask)} ${(this.props.className) || this.props.className}`
    return (
      <div className={className} onClick={() => this.props.handleClick()}></div>
    )
  }
})

export default ClickMask
