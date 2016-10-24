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
  componentDidMount() {
    // Remove message after a certain amount of time
    setTimeout(() => this.props.removeMessage(), 5000)
  },
  render() {
    return (
      <div className={`${this.props.globals.message.status} ${styles.message}`} onClick={() => this.props.removeMessage()}>{this.props.globals.message.text}</div>
    )
  }
})

export default GlobalMessage
