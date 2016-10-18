import React from 'react'
import styles from './styles.css'
import AuthModal from 'components/auth-modal'
import Jungle from 'assets/images/jungle.jpg'

const Login = React.createClass({
  propTypes: {
    globals: React.PropTypes.object
  },
  render() {
    const backgroundStyle = {
      backgroundImage: 'url(' + Jungle + ')',
    }
    return (
      <div className={styles.main} style={backgroundStyle}>
        <AuthModal />
      </div>
    )
  }
})

export default Login
