import React from 'react'
import styles from './styles.css'
import EditRepositoryItem from 'components/edit-repository-item'

const EditRepositoryList = React.createClass({
  propTypes: {
    repositories: React.PropTypes.array
  },
  render() {
    const repositoryText = this.props.repositories.length === 1 ? 'Repository' : 'Repositories'
    return (
      <div>
        <p className={styles.amountText}>{this.props.repositories.length} {repositoryText}</p>
        <ul className={styles.repositoryList}>
          {this.props.repositories.map((repository, index) => <EditRepositoryItem key={index} index={index} repository={repository} {...this.props} />)}
        </ul>
      </div>
    )
  }
})

export default EditRepositoryList
