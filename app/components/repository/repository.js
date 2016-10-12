import React from 'react'
import styles from './styles.css'
import Commit from '../commit/commit.js'
import ClickMask from '../click-mask/click-mask.js'

const Repository = React.createClass({
  propTypes: {
    repositories: React.PropTypes.arrayOf({
      commits: React.PropTypes.array.isRequired
    }),
    index: React.PropTypes.number,
    menuOpen: React.PropTypes.bool,
    removeRepository: React.PropTypes.func,
    toggleRepositoryMenu: React.PropTypes.func,
    repository: React.PropTypes.object,
    globals: React.PropTypes.object
  },
  componentDidMount() {
    // Add repo to localstorage
    localStorage.setItem('managedRepositories', JSON.stringify(this.props.repositories, ['name']))
  },
  componentWillUnmount() {
    const storedRepositories = localStorage.getItem('managedRepositories')

    // Remove repo from localstorage
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
            <ClickMask active={repository.menuOpen} handleClick={() => this.props.toggleRepositoryMenu(this.props.index)}/>
            <button className={styles.menuButton} onClick={() => this.props.toggleRepositoryMenu(this.props.index)}>Menu</button>
            <ul className={repository.menuOpen ? styles.optionsOpen : styles.options}>
              <li className={styles.option}>
                <button className={styles.button} onClick={() => this.props.removeRepository(this.props.index)}>Remove</button>
              </li>
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
