import React from 'react'
import styles from './styles.css'

const Button = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    handleClick: React.PropTypes.func
  },
  render() {
    return (
      <button onClick={this.props.handleClick} className={styles.button}>{this.props.text}</button>
    )
  }
})

export default Button
