import React from 'react'
import Banner from '../banner/banner'
import styles from './styles.css'

const MainComponent = React.createClass({
  // TODO Add prop validation
  render() {
    return (
      <div className={styles.main}>
        <Banner name={this.props.globals.name} />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    )
  }
})

export default MainComponent
