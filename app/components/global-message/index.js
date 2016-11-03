import React from 'react'
import styles from './styles.css'
import { connect } from 'react-redux'
import { removeMessage } from 'actions'
import { fetchRepository, activateAddForm } from 'actions'
import { bindActionCreators } from 'redux'

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
function mapStateToProps(state) {
  return {
    globals: state.globals
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeMessage, activateAddForm }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalMessage)
