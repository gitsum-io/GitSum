import React from 'react'
import { Link } from 'react-router'
import styles from './styles.css'
import GitSumLogo from 'assets/images/gitsum-logo.svg'
import ProfileDropdown from 'components/profile-dropdown'
import Button from 'components/button'
import AddIcon from 'assets/images/add-icon.svg'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { activateAddForm } from 'actions/globals'

const BannerComponent = React.createClass({
  propTypes: {
    activateAddForm: React.PropTypes.func
  },
  render() {
    const addIcon = <AddIcon className={styles.addIcon} />
    return (
      <header className={styles.header}>
        <Link className={styles.link} to="/"><GitSumLogo className={styles.logo} /></Link>
        <div className={styles.actions}>
          <Button icon={addIcon} className={styles.addButton} handleClick={() => this.props.activateAddForm()}><span className={styles.addButtonText}>Add a Repository</span></Button>
          <ProfileDropdown />
        </div>
      </header>
    )
  }
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ activateAddForm }, dispatch)
}

export default connect(null, mapDispatchToProps)(BannerComponent)
