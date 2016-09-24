import React from 'react'
import styles from './styles.css'
import moment from 'moment'

const Commit = React.createClass({
  render() {
    const { commit } = this.props
    return (
      <div className={styles['commit-range']}>
        <time className={styles.date}>Commits on {moment(commit.commit.author.date).format('MMM DD, YYYY')}</time>
        <div className={styles.commit}>
          <img className={styles.avatar} src={commit.author.avatar_url} />
          <div className={styles.details}>
            <p className={styles.message}>{commit.commit.message}</p>
            <p className={styles.author}>{commit.author.login} {moment(commit.commit.author.date).startOf('hour').fromNow()}</p>
          </div>
        </div>
      </div>
    )
  }
})

export default Commit
