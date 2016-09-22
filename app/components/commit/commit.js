import React from 'react'
import styles from './styles.css'

const Commit = React.createClass({
  render() {
    const { commit } = this.props
    return (
      <div className={styles.commit}>
        <img className={styles.avatar} src={commit.author.avatar_url} />
        <div className={styles.details}>
          <p className={styles.message}>{commit.commit.message}</p>
          <p className={styles.author}>{commit.author.login}</p>
        </div>
      </div>
    )
  }
})

export default Commit
