import React from 'react'
import styles from './styles.css'

const ViewWrapper = React.createClass({
  propTypes: {
    children: React.PropTypes.object
  },
  render() {
    return (
      <div className={styles.viewWrapper}>{React.cloneElement(this.props.children, this.props)}</div>
    )
  }
})

export default ViewWrapper
