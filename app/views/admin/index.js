import React from 'react'
import styles from './styles.css'
import Banner from 'components/banner'

const Admin = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      token: React.PropTypes.string
    }),
    children: React.PropTypes.object
  },
  render() {
    return (
      <div className={styles.main}>
        <Banner />
      </div>
    )
  }
})

export default Admin
