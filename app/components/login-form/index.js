import React from 'react'
import styles from './styles.css'
import GitHubIcon from 'assets/images/octocat-inverted.svg'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getAuthUrl } from 'actions'

// TODO Get repo settings from backend for posting to Github
// TODO Style github button
// TODO Add a loading animation

const LoginForm = React.createClass({
  propTypes: {
    heading: React.PropTypes.string,
    globals: React.PropTypes.shape({
      stateToken: React.PropTypes.string
    }),
    getStateToken: React.PropTypes.func,
    getAuthUrl: React.PropTypes.func
  },
  render() {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=183eb9754ab178e57b49&scope=repo%20user&state=${this.props.globals.stateToken}`
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getAuthUrl }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
