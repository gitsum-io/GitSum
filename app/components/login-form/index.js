import React from 'react'
import styles from './styles.css'
import Button from 'components/button'

// TODO Get repo settings from backend for posting to Github

const LoginForm = React.createClass({
  propTypes: {
    heading: React.PropTypes.string,
    authenticateUser: React.PropTypes.func.isRequired
  },
  getInitialState() {
    return {
      username: '',
      password: ''
    }
  },
  handleSubmit(event) {
    event.preventDefault()
    if (this.validateFields()) {
      // TODO Validate user details
      this.props.authenticateUser(this.state.username, this.state.password)
      // browserHistory.push('/')
    } else {
      console.log('invalid')
    }
  },
  validateFields() {
    return (this.state.username.length && this.state.password.length)
  },
  setValue(field, event) {
    const object = {}
    object[field] = event.target.value
    this.setState(object)
  },
  render() {
    return (
      <div className={styles.loginForm}>
        <h1 className={styles.heading}>{this.props.heading}</h1>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          {/*
          <input name="username" className={styles.input} type="text" placeholder="Username" required onChange={(event) => this.setValue('username', event)}/>
          <input name="password" className={styles.input} type="password" placeholder="Password" required onChange={(event) => this.setValue('password', event)}/>
          <Button className={styles.loginButton} handleClick={(event) => this.handleSubmit(event)}>Log in</Button>
          */}
          <a className={styles.githubButton} href="https://github.com/login/oauth/authorize?client_id=183eb9754ab178e57b49&scope=repo%20user&state=$2a$10$H6JjAdLB3SUpEcZbI0SgVe">Github</a>
        </form>
      </div>
    )
  }
})

export default LoginForm
