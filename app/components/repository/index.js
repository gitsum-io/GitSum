import React from 'react'
import styles from './styles.css'
import Commit from 'components/commit'
import ClickMask from 'components/click-mask'
import OcotoCatIcon from 'assets/images/octocat.svg'
import HorizontalDotsIcon from 'assets/images/horizontal-dots.svg'

const Repository = React.createClass({
  propTypes: {
    repositories: React.PropTypes.array,
    index: React.PropTypes.number,
    menuOpen: React.PropTypes.bool,
    removeRepository: React.PropTypes.func,
    toggleRepositoryMenu: React.PropTypes.func,
    repository: React.PropTypes.object,
    globals: React.PropTypes.object,
    fetchRepository: React.PropTypes.func
  },
  componentDidMount() {
    // Add repo to localstorage
    localStorage.setItem('managedRepositories', JSON.stringify(this.props.repositories, ['url', 'name']))

    // Refresh every minute
    const refresh = setInterval(() => {this.props.fetchRepository(this.props.repository.name, this.props.repository.url, this.props.index)}, 60000)
    this.setState({refresh: refresh})
  },
  componentWillUnmount() {
    const storedRepositories = localStorage.getItem('managedRepositories')
    clearInterval(this.state.refresh)

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
          <OcotoCatIcon className={styles.typeIcon} />
          <h2 className={styles.heading}><a href={repository.url}>{repository.name}</a></h2>
          <div className={styles.menu}>
            <ClickMask active={repository.menuOpen} handleClick={() => this.props.toggleRepositoryMenu(this.props.index)}/>
            <button className={styles.menuButton} onClick={() => this.props.toggleRepositoryMenu(this.props.index)}><HorizontalDotsIcon className={styles.menuIcon} /></button>
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
