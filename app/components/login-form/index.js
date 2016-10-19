import React from 'react'
import styles from './styles.css'
import Button from 'components/button'

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
      console.log(this.props)
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
          <input name="username" type="text" placeholder="Username" required onChange={(event) => this.setValue('username', event)}/>
          <input name="password" type="password" placeholder="Password" required onChange={(event) => this.setValue('password', event)}/>
          <Button className={styles.loginButton} text="Log in" handleClick={(event) => this.handleSubmit(event)} />
        </form>
      </div>
    )
  }
})

export default LoginForm
