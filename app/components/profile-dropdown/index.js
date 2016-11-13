import React from 'react'
import styles from './styles.css'
import ChevronIcon from 'assets/images/chevron.svg'
import CoverImage from 'components/cover-image'
import ClickMask from 'components/click-mask'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toggleProfileMenu } from 'actions/globals'

const ProfileDropdown = React.createClass({
  propTypes: {
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
      email: React.PropTypes.string,
      avatar: React.PropTypes.string
    }),
    globals: React.PropTypes.shape({
      profileMenuOpen: React.PropTypes.bool
    }),
    toggleProfileMenu: React.PropTypes.func
  },
  render() {
    return (
      <div className={styles.dropdown}>
        <button className={styles.button} onClick={() => this.props.toggleProfileMenu()}>
          <CoverImage className={styles.avatar} src={this.props.user.avatar} alt={this.props.user.name} />
          <p className={styles.name}>{this.props.user.name}</p>
          <ChevronIcon className={styles.indicator} />
        </button>
        <ClickMask className={styles.dropdownClickMask} active={this.props.globals.profileMenuOpen} handleClick={() => this.props.toggleProfileMenu()}/>
        <div className={this.props.globals.profileMenuOpen ? styles.dropdownPanelOpen : styles.dropdownPanel }>
          <div className={styles.dropdownPanelUserDetails}>
            <CoverImage className={styles.avatarLarge} src={this.props.user.avatar} alt={this.props.user.name} />
            <div>
              <p className={styles.name}>{this.props.user.name}</p>
              <p className={styles.email}>{this.props.user.email}</p>
            </div>
          </div>
          <div className={styles.dropdownPanelLinks}>
            <Link className={styles.dropdownPanelLink} to="/admin/profile">Profile</Link>
            <Link className={styles.dropdownPanelLink} to="/admin/repositories">Repositories</Link>
            <Link className={styles.dropdownPanelLink} to="/sign-out">Sign Out</Link>
          </div>
        </div>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return {
    globals: state.globals,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ toggleProfileMenu }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown)
