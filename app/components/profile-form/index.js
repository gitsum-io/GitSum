import React from 'react'
import styles from './styles.css'
import { connect } from 'react-redux'
import Button from 'components/button'
import Label from 'components/label'
import { bindActionCreators } from 'redux'
import { setUserDetails } from 'actions/user'

const ProfileForm = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
      email: React.PropTypes.string,
      username: React.PropTypes.string
    }),
    setUserDetails: React.PropTypes.func
  },
  getInitialState() {
    return this.props.user
  },
  handleSubmit(state) {
    if (!this.validateForm()) {
      this.props.setUserDetails(state)
      console.log('valid')
    } else {
      console.log('not valid')
    }
  },
  updateStateValue(event) {
    const newState =  Object.assign({}, this.state)
    newState[event.target.id] = event.target.value
    console.log(newState)
    this.setState(newState)
  },
  validateForm() {
    console.log('this.state.name', this.state.name.length)
    console.log('this.state.username', this.state.username.length)
    console.log('this.state.lastName', this.state.lastName.length)
    console.log('this.state.email', this.state.email.length)
    console.log((!this.state.name.length || !this.state.lastName.length || !this.state.username.length || !this.state.email.length))
    return (!this.state.name.length || !this.state.lastName.length || !this.state.username.length || !this.state.email.length)
  },
  render() {
    return (
      <form className={styles.form}>
        <Label for="name">First Name</Label>
        <input placeholder="Octo" name="name" id="name" className={styles.input} onChange={(event) => this.updateStateValue(event)} value={this.state.name} />
        <Label for="lastName">Last Name</Label>
        <input placeholder="Cat" name="lastName" id="lastName" className={styles.input} onChange={(event) => this.updateStateValue(event)} value={this.state.lastName} />
        <Label for="username">Username</Label>
        <input placeholder="Octocat" name="username" id="username" className={styles.input} onChange={(event) => this.updateStateValue(event)} value={this.state.username} />
        <Label for="email">Email</Label>
        <input placeholder="you@email.com" type="email" name="email" id="email" className={styles.input} onChange={(event) => this.updateStateValue(event)} value={this.state.email} />
        <Button className={styles.updateButton} type="button" handleClick={() => this.handleSubmit()}>Update Settings</Button>
      </form>
    )
  }
})

function mapStateToProps(state) {
  return { user: state.user }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setUserDetails }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
