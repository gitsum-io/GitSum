import React from 'react'
import styles from './styles.css'
import Banner from 'components/banner'
import RepositoryList from 'components/repository-list'

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
