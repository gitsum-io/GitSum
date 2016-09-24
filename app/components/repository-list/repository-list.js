import React from 'react'
import Repository from '../repository/repository.js'
import AddForm from '../add-form/add-form.js'
import styles from './styles.css'

// TODO Rearrange repos with most recently update on the left
// TODO Deal with rate limits

const RepositoryList = React.createClass({
  componentDidMount() {
    // Fetch any existing repositories from local storage
    const existingRepositories = localStorage.getItem('managedRepositories')
    if (existingRepositories) {
      JSON.parse(existingRepositories).forEach((repository) => {
        this.props.fetchRepository(repository.name)
      })
    }
  },
  render() {
    return (
      <main className={styles.main}>
        {this.props.repositories.map((repository, index) => <Repository {...this.props} key={index} index={index} repository={repository} />)}
        <AddForm {...this.props}/>
      </main>
    )
  }
})

export default RepositoryList
