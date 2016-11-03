import React from 'react'
import styles from './styles.css'
import { connect } from 'react-redux'
import { Link } from 'react-router'

const Admin = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      name: React.PropTypes.string
    }),
    children: React.PropTypes.object
  },
  render() {
    return (
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.container}>
            <h2 className={styles.heading}>{this.props.user.name}</h2>
          </div>
        </div>
        <nav className={styles.tabs}>
          <div className={styles.container}>
            <Link className={styles.tab} activeClassName={styles.tabActive} to="/admin/profile">Profile</Link>
            <Link className={styles.tab} activeClassName={styles.tabActive} to="/admin/repositories">Repositories</Link>
          </div>
        </nav>
        <div className={styles.mainContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Admin)
