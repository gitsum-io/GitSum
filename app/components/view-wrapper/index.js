import React from 'react'
import styles from './styles.css'
import GlobalMessage from 'components/global-message'
import { connect } from 'react-redux'

const ViewWrapper = React.createClass({
  propTypes: {
    children: React.PropTypes.object,
    globals: React.PropTypes.shape({
      message: React.PropTypes.shape({
        status: React.PropTypes.string,
        text: React.PropTypes.string,
      })
    })
  },
  render() {
    let globalMessage
    if (this.props.globals.message) {
      globalMessage = <GlobalMessage />
    }
    return (
      <div className={styles.viewWrapper}>
        {globalMessage}
        {this.props.children}
      </div>
    )
  }
})

function mapStateToProps(state) {
  return { globals: state.globals }
}

export default connect(mapStateToProps)(ViewWrapper)
