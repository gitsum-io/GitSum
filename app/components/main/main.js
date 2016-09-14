import React from 'react'
import Banner from '../banner/banner.js'
import styles from './styles.css'

const MainComponent = React.createClass({
  render: function() {
    return (
      <div className={styles.main}>
        <Banner name="GitSum" />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
})

export default MainComponent
