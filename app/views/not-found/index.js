import React from 'react'
import styles from './styles.css'

const NotFound = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      token: React.PropTypes.string
    }),
    children: React.PropTypes.object
  },
  render() {
    return (
      <div className={styles.main}>
        NOT FOUND
      </div>
    )
  }
})

export default NotFound
