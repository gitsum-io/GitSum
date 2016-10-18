import React from 'react'
import styles from './styles.css'

const GlobalMessage = React.createClass({
  propTypes: {
    globals: React.PropTypes.shape({
      message: React.PropTypes.shape({
        status: React.PropTypes.string,
        text: React.PropTypes.string,
      })
    }),
    removeMessage: React.PropTypes.func
  },
  render() {
    return (
      <div className={`${this.props.globals.message.status} ${styles.message}`} onClick={() => this.props.removeMessage()}>{this.props.globals.message.text}</div>
    )
  }
})

export default GlobalMessage
