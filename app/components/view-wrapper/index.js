import React from 'react'
import styles from './styles.css'
import GlobalMessage from 'components/global-message'

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
      globalMessage = <GlobalMessage {...this.props} />
    }
    return (
      <div className={styles.viewWrapper}>
        {globalMessage}
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
})

export default ViewWrapper
