import React from 'react'
import styles from './styles.css'

const GithubAuth = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      token: React.PropTypes.string
    }),
    location: React.PropTypes.object,
    sendAuthResponse: React.PropTypes.func
  },
  componentDidMount() {
    this.props.sendAuthResponse(this.props.location.query.code, this.props.location.query.state)
  },
  render() {
    return (
      <div className={styles.main}>
        <h2>GithubAuth</h2>
        <p>{this.props.location.query.code}</p>
        <p>{this.props.location.query.state}</p>
      </div>
    )
  }
})

export default GithubAuth
