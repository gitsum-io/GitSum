import React from 'react'
import styles from './styles.css'
import Repository from 'components/repository'
import AddForm from 'components/add-form'
import AddIcon from 'assets/images/add-icon.svg'
import Button from 'components/button'
import Instructions from 'components/instructions'
import { connect } from 'react-redux'
import { fetchRepository, activateAddForm } from 'actions'
import { bindActionCreators } from 'redux'

// TODO Rearrange repos with most recently update on the left
// TODO Deal with rate limits

const RepositoryList = React.createClass({
  propTypes: {
    repositories: React.PropTypes.array,
    fetchRepository: React.PropTypes.func,
    activateAddForm: React.PropTypes.func
  },
  componentDidMount() {
    // Fetch any existing repositories from local storage
    // const existingRepositories = localStorage.getItem('managedRepositories')
    // if (existingRepositories) {
    //   JSON.parse(existingRepositories).forEach((repository) => {
    //     if (repository.url && repository.name) {
    //       this.props.fetchRepository(repository.name, repository.url)
    //     }
    //   })
    // }
  },
  render() {
    const addIcon = <AddIcon className={styles.addIcon} />
    let repositoriesComponent
    let instructionsComponent
    let addButton
    if (this.props.repositories.length) {
      repositoriesComponent = this.props.repositories.map((repository, index) => <Repository key={index} index={index} repository={repository} />)
    } else {
      instructionsComponent = <Instructions />
      addButton = <Button icon={addIcon} className={styles.addFormButton} handleClick={() => this.props.activateAddForm()}>Add Repository</Button>
    }
    return (
      <main className={this.props.repositories.length ? styles.main : styles.mainEmpty}>
        {repositoriesComponent}
        {instructionsComponent}
        {addButton}
        <AddForm />
      </main>
    )
  }
})

function mapStateToProps(state) {
  return {
    repositories: state.repositories
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRepository, activateAddForm }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryList)
