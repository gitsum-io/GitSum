import React from 'react'
import styles from './styles.css'
import Repository from 'components/repository'
import AddForm from 'components/add-form'
import Instructions from 'components/instructions'

// TODO Rearrange repos with most recently update on the left
// TODO Deal with rate limits

const RepositoryList = React.createClass({
  propTypes: {
    repositories: React.PropTypes.array,
    fetchRepository: React.PropTypes.func
  },
  componentDidMount() {
    // Fetch any existing repositories from local storage
    const existingRepositories = localStorage.getItem('managedRepositories')
    if (existingRepositories) {
      JSON.parse(existingRepositories).forEach((repository) => {
        this.props.fetchRepository(repository.name, repository.url)
      })
    }
  },
  render() {
    let repositoriesComponent
    let instructionsComponent
    if (this.props.repositories.length) {
      repositoriesComponent = this.props.repositories.map((repository, index) => <Repository {...this.props} key={index} index={index} repository={repository} />)
    } else {
      instructionsComponent = <Instructions />
    }
    return (
      <main className={this.props.repositories.length ? styles.main : styles.mainEmpty}>
        {repositoriesComponent}
        {instructionsComponent}
        <AddForm {...this.props}/>
      </main>
    )
  }
})

export default RepositoryList
