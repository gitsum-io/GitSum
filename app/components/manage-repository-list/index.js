import React from 'react'
import styles from './styles.css'
import { connect } from 'react-redux'
import ManageRepositoryItem from 'components/manage-repository-item'

const ManageRepositoryList = React.createClass({
  propTypes: {
    repositories: React.PropTypes.array,
    globals: React.PropTypes.shape({
      repositoryLoading: React.PropTypes.bool
    })
  },
  render() {
    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Repository</th>
            <th>URI</th>
            <th>URI type</th>
            <th>Host</th>
            <th>Move</th>
          </tr>
        </thead>
        <tbody>
          {this.props.repositories.map((repository, index) => <ManageRepositoryItem key={index} index={index} repository={repository} />)}
        </tbody>
      </table>
    )
  }
})

function mapStateToProps(state) {
  return {
    repositories: state.repositories,
    globals: state.globals
  }
}

export default connect(mapStateToProps)(ManageRepositoryList)
