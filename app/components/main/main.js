import React from 'react'
import Banner from '../banner/banner'
import styles from './styles.css'
import GlobalMessage from '../global-message/global-message'

const MainComponent = React.createClass({
  propTypes: {
    children: React.PropTypes.object,
    globals: React.PropTypes.object,
    message: React.PropTypes.object
  },
  render() {
    let messageComponent
    if (this.props.globals.message) {
      messageComponent = <GlobalMessage {...this.props} />
    }
    return (
      <div className={styles.main}>
        <Banner name={this.props.globals.name} />
        {React.cloneElement(this.props.children, this.props)}
        {messageComponent}
      </div>
    )
  }
})

export default MainComponent
