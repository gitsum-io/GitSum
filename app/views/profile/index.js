import React from 'react'
import styles from './styles.css'
import { browserHistory } from 'react-router'

const Profile = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      token: React.PropTypes.string
    })
  },
  componentWillMount() {
    if (!this.props.user.token) browserHistory.push('/login')
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
