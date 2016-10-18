import React from 'react'
import styles from './styles.css'
import SlothIcon from 'assets/images/sloth.svg'
import LoginForm from 'components/login-form'

const AuthModal = React.createClass({
  propTypes: {
    heading: React.PropTypes.string
  },
  handleSubmit(event) {
    event.preventDefault()
  },
  render() {
    const form = <LoginForm heading="Log in to your GitSum account" /> || <div>Sign Up</div>
    return (
      <div className={styles.authModal}>
        <SlothIcon className={styles.slothIcon} />
        {form}
      </div>
    )
  }
})

export default AuthModal
