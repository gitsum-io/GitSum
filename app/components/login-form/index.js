import React from 'react'
import styles from './styles.css'
import GitHubIcon from 'assets/images/octocat-inverted.svg'
import { connect } from 'react-redux'

// TODO Get repo settings from backend for posting to Github
// TODO Style github button
// TODO Add a loading animation
// TODO Remove state token actions

const LoginForm = React.createClass({
  propTypes: {
    heading: React.PropTypes.string,
    globals: React.PropTypes.shape({
      stateToken: React.PropTypes.string,
      authInfo: React.PropTypes.shape({
        client_id: React.PropTypes.string,
        scope: React.PropTypes.array,
        state: React.PropTypes.string
      }).isRequired
    }),
    getStateToken: React.PropTypes.func,
    getAuthInfo: React.PropTypes.func
  },
  render() {
    const authInfo = this.props.globals.authInfo
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${authInfo.client_id}&scope=repo%20user&state=${authInfo.client_id}`
    return (
      <div className={styles.loginForm}>
        <h1 className={styles.heading}>{this.props.heading}</h1>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <a className={styles.githubButton} href={githubAuthUrl}><GitHubIcon className={styles.githubIcon} />Sign in with Github</a>
        </form>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return { globals: state.globals }
}

export default connect(mapStateToProps)(LoginForm)
