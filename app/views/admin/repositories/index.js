import React from 'react'
import styles from './styles.css'
import ManageRepositoryList from 'components/manage-repository-list'

const Repositories = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      token: React.PropTypes.string
    })
  },
  render() {
    return (
      <div className={styles.main}>
        <ManageRepositoryList />
      </div>
    )
  }
})

export default Repositories
