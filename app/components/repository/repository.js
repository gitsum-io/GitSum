import React from 'react'
import styles from './styles.css'
import Commit from '../commit/commit.js'

const Repository = React.createClass({
  propTypes: {
    repositories: React.PropTypes.array,
    index: React.PropTypes.number,
    removeRepository: React.PropTypes.func,
    repository: React.PropTypes.object
  },
  getInitialState() {
    return {
      menuOpen: false
    }
  },
  componentDidMount() {
    // Add repo to localstorage
    localStorage.setItem('managedRepositories', JSON.stringify(this.props.repositories, ['name']))
  },
  componentWillUnmount() {
    const storedRepositories = localStorage.getItem('managedRepositories')

    if (storedRepositories) {
      const oldList = JSON.parse(storedRepositories)
      const newList = [
        ...oldList.splice(0, this.props.index),
        ...oldList.splice(this.props.index + 1)
      ]
      localStorage.setItem('managedRepositories', JSON.stringify(newList))
    }
  },
  toggleMenu() {
    this.setState({menuOpen: !this.state.menuOpen})
  },
  render() {
    const { repository } = this.props
    return (
      <div className={styles.repository}>
        <header className={styles.header}>
          <h2 className={styles.heading}>{repository.name}</h2>
          <div className={styles.menu}>
            <button className={styles.menuButton} onClick={this.toggleMenu}>Menu</button>
            <ul className={this.state.menuOpen ? styles.optionsOpen : styles.options}>
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
