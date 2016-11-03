import React from 'react'
import styles from './styles.css'
import { connect } from 'react-redux'
import CoverImage from 'components/cover-image'

const Profile = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
      avatar: React.PropTypes.string
    })
  },
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.userBio}>
          <CoverImage className={styles.avatar} src={this.props.user.avatar} alt={this.props.user.name} />
          <div className={styles.avatarActions}>
            <p>Your avatar</p>
            <button>Update</button>
          </div>
        </div>
        <form className={styles.form}>
          <label htmlFor="first-name">First Name</label>
          <input name="first-name" id="first-name" className={styles.input} />
          <label htmlFor="last-name">Last Name</label>
          <input name="last-name" id="last-name" className={styles.input} />
          <label htmlFor="username">Username</label>
          <input name="username" id="username" className={styles.input} />
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" className={styles.input} />
          <button>Update Settings</button>
        </form>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Profile)
