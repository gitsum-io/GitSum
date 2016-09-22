import React from 'react'
import styles from './styles.css'

const Commit = React.createClass({
  render() {
    const { commit } = this.props
    console.log('COMMIT', commit)
    return (
      <div className={styles.commit}>
        <p>{commit.hash}</p>
        <p>{commit.message}</p>
        <p>{commit.commit.message}</p>
      </div>
    )
  }
})

export default Commit
