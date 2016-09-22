import React from 'react'
import Banner from '../banner/banner.js'
import styles from './styles.css'

const MainComponent = React.createClass({
  render() {
    return (
      <div className={styles.main}>
        <Banner name={this.props.global.name} />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
})

export default MainComponent
