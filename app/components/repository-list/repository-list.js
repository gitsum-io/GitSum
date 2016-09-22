import React from 'react'
import Repository from '../repository/repository.js'
import AddForm from '../add-form/add-form.js'
import styles from './styles.css'

const RepositoryList = React.createClass({
  render() {
    return (
      <main className={styles.main}>
        {this.props.repositories.map((repository, i) => <Repository {...this.props} key={i} i={i} repository={repository} />)}
        <AddForm {...this.props}/>
      </main>
    )
  }
})

export default RepositoryList
