import React from 'react'
import styles from './styles.css'

const Button = React.createClass({
  propTypes: {
    text: React.PropTypes.string,
    handleClick: React.PropTypes.func,
    type: React.PropTypes.string,
    children: React.PropTypes.object,
    additionalClassName: React.PropTypes.string,
    icon: React.PropTypes.func
  },
  render() {
    console.log(this.props.additionalClassName)
    return (
      <button type={this.props.type} onClick={this.props.handleClick} className={`${styles.button} ${this.props.additionalClassName}`}>{this.props.icon}{this.props.text}</button>
    )
  }
})

export default Button
