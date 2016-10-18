import React from 'react'
import { Link } from 'react-router'
import styles from './styles.css'
import GitSumLogo from 'assets/images/gitsum-logo.svg'

const BannerComponent = React.createClass({
  render() {
    return (
      <header className={styles.header}>
        <Link className={styles.link} to="/"><GitSumLogo className={styles.logo} /></Link>
      </header>
    )
  }
})

export default BannerComponent
