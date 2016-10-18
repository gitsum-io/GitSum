import React from 'react'
import Banner from '../banner/banner'
import styles from './styles.css'
import RepositoryList from '../repository-list/repository-list'

const MainComponent = React.createClass({
  propTypes: {
    globals: React.PropTypes.object
  },
  render() {
    return (
      <div className={styles.main}>
        <Banner name={this.props.globals.name} />
        <RepositoryList {...this.props} />
      </div>
    )
  }
})

export default MainComponent
