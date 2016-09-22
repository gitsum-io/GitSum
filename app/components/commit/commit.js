import React from 'react'
import styles from './styles.css'

const Commit = React.createClass({
  render() {
    const { commit } = this.props
    return (
      <div className={styles.commit}>
        <p>{commit.commit.message}</p>
      </div>
    )
  }
})

export default Commit
