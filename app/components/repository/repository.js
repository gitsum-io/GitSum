import React from 'react'
import styles from './styles.css'
import Commit from '../commit/commit.js'

const Repository = React.createClass({
  render () {
    console.log('THIS.PROPS', this.props)
    const { repository } = this.props
    return (
      <div className={styles.repository}>
        <h2 className={styles.header}>{repository.name}</h2>
        {repository.commits.map((commit, i) => <Commit {...repository} key={i} i={i} commit={commit} />)}
      </div>
    )
  }
})

export default Repository
