import React from 'react'
import styles from './styles.css'

const Profile = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      token: React.PropTypes.string
    })
  },
  render() {
    return (
      <div className={styles.main}>
        Profile
      </div>
    )
  }
})

export default Profile
