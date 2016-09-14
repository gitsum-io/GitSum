import React from 'react'
import Repository from '../repository/repository.js'
import styles from './styles.css'

const RepositoryList = React.createClass({
  render: function() {
    return (
      <main className={styles.main}>
        <Repository />
      </main>
    )
  }
})

export default RepositoryList
