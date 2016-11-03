import React from 'react'
import styles from './styles.css'
import EditRepositoryItem from 'components/edit-repository-item'
import Spinner from 'components/spinner'
import { connect } from 'react-redux'

const EditRepositoryList = React.createClass({
  propTypes: {
    repositories: React.PropTypes.array,
    globals: React.PropTypes.shape({
      repositoryLoading: React.PropTypes.bool
    })
  },
  render() {
    const repositoryText = this.props.repositories.length === 1 ? 'Repository' : 'Repositories'
    let spinner
    if (this.props.globals.repositoryLoading) {
      spinner = <Spinner />
    }
    return (
      <div>
        <p className={styles.amountText}>{this.props.repositories.length} {repositoryText}</p>
        <div className={styles.repositoryListWrapper}>
          <ul className={styles.repositoryList}>
            {this.props.repositories.map((repository, index) => <EditRepositoryItem key={index} index={index} repository={repository} />)}
          </ul>
          {spinner}
        </div>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    repositories: state.repositories,
    globals: state.globals
  }
}

export default connect(mapStateToProps)(EditRepositoryList)
