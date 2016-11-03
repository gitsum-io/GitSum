import React from 'react'
import styles from './styles.css'

const Repositories = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      token: React.PropTypes.string
    })
  },
  render() {
    return (
      <div className={styles.main}>
        Repositories
      </div>
    )
  }
})

export default Repositories
