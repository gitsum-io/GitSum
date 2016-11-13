import React from 'react'
import styles from './styles.css'
import GlobalMessage from 'components/global-message'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAuthInfo, sendAuthResponse } from 'actions'
import { browserHistory } from 'react-router'

const ViewWrapper = React.createClass({
  propTypes: {
    children: React.PropTypes.object,
    globals: React.PropTypes.shape({
      message: React.PropTypes.shape({
        status: React.PropTypes.string,
        text: React.PropTypes.string,
      }),
      authInfo: React.PropTypes.shape({
        client_id: React.PropTypes.string,
        scope: React.PropTypes.array,
        state: React.PropTypes.string
      })
    }),
    getAuthInfo: React.PropTypes.func,
    sendAuthResponse: React.PropTypes.func,
    closeOverlays: React.PropTypes.func,
    location: React.PropTypes.object
  },
  componentWillMount() {
    const query = this.props.location.query
    if (query.code && query.state) {
      const auth = new Promise((resolve) => {
        resolve(this.props.getAuthInfo())
      })
      auth.then((res) => {
        this.props.sendAuthResponse({
          client_id: res.client_id,
          state: query.state,
          code: query.code,
          scope: ['user', 'repo']
        })
      })
    }

    // Close overlays when route changes
    browserHistory.listen(() =>  {
      this.props.closeOverlays()
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAuthInfo, sendAuthResponse }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewWrapper)
