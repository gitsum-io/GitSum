import React from 'react'
import styles from './styles.css'
import Commit from '../commit/commit.js'

const Repository = React.createClass({
  componentDidMount() {
    // Add repo to localstorage
    localStorage.setItem('managedRepositories', JSON.stringify(this.props.repositories, ['name']))
  },
  componentWillUnmount() {
    let storedRepositories = localStorage.getItem('managedRepositories')

    if (storedRepositories) {
      const oldList = JSON.parse(storedRepositories)
      const newList = [
        ...oldList.splice(0, this.props.index),
        ...oldList.splice(this.props.index + 1)
      ]
      localStorage.setItem('managedRepositories', JSON.stringify(newList))
    }
  },
  render() {
    const { repository } = this.props
    return (
      <div className={styles.repository}>
        <header className={styles.header}>
          <h2 className={styles.heading}>{repository.name}</h2>
          <div className={styles.menu}>
            <button>Menu</button>
            <ul>
              <li><button onClick={() => this.props.removeRepository(this.props.index)}>Remove</button></li>
            </ul>
          </div>
        </header>
        <div className={styles.commits}>
          {repository.commits.map((commit, i) => <Commit {...repository} key={i} index={i} commit={commit} />)}
        </div>
      </div>
    )
  }
})

export default Repository
