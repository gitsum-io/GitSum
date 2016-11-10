import React from 'react'
import styles from './styles.css'
import { connect } from 'react-redux'
import CoverImage from 'components/cover-image'
import ProfileForm from 'components/profile-form'

const Profile = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
      avatar: React.PropTypes.string,
      email: React.PropTypes.string,
      username: React.PropTypes.string
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
        <ProfileForm />
      </div>
    )
  }
})

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Profile)
