import React from 'react'
import styles from './styles.css'
import Button from 'components/button'

const LoginForm = React.createClass({
  propTypes: {
    heading: React.PropTypes.string
  },
  handleSubmit(event) {
    event.preventDefault()
    console.log(event)
  },
  render() {
    return (
      <div className={styles.loginForm}>
        <h1 className={styles.heading}>{this.props.heading}</h1>
        <form className={styles.form} onSubmit={this.handleSubmit}>
          <input name="username" type="text" placeholder="Username" required onChange={this.setName}/>
          <input name="password" type="password" placeholder="Password" required onChange={this.setUrl}/>
          <Button className={styles.loginButton} text="Log in" handleClick={() => this.handleSubmit()} />
        </form>
      </div>
    )
  }
})

export default LoginForm
