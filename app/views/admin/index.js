import React from 'react'
import styles from './styles.css'
import Banner from 'components/banner'
import { browserHistory } from 'react-router'

const Admin = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      token: React.PropTypes.string
    }),
    children: React.PropTypes.object
  },
  // componentWillMount() {
  //   if (!this.props.user.token) browserHistory.push('/login')
  // },
  render() {
    return (
      <div className={styles.main}>
        <Banner {...this.props} />
      </div>
    )
  }
})

export default Admin
