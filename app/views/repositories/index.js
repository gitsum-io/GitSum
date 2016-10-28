import React from 'react'
import styles from './styles.css'
import { browserHistory } from 'react-router'

const Repositories = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      token: React.PropTypes.string
    })
  },
  componentWillMount() {
    if (!this.props.user.token) browserHistory.push('/login')
  },
  render() {
    return (
      <div className={styles.main}>
        Repositories
      </div>
    )
  }
})

export default Repositories
