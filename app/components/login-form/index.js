import React from 'react'
import styles from './styles.css'

// TODO Get repo settings from backend for posting to Github
// TODO Style github button
// TODO Add a loading animation

const LoginForm = React.createClass({
  propTypes: {
    heading: React.PropTypes.string,
    getStateToken: React.PropTypes.func
  },
  render() {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=183eb9754ab178e57b49&scope=repo%20user&state={this.props.stateToken}`
    return (
      <div className={styles.loginForm}>
        <h1 className={styles.heading}>{this.props.heading}</h1>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <a className={styles.githubButton} href={githubAuthUrl}>Github</a>
        </form>
      </div>
    )
  }
})

export default LoginForm
