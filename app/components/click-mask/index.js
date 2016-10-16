import React from 'react'
import styles from './styles.css'

const ClickMask = React.createClass({
  propTypes: {
    active: React.PropTypes.bool,
    handleClick: React.PropTypes.func
  },
  render() {
    return (
      <div className={this.props.active ? styles.maskActive : styles.mask} onClick={() => this.props.handleClick()}></div>
    )
  }
})

export default ClickMask
