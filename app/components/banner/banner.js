import React from 'react'
import { Link } from 'react-router'
import styles from './styles.css'

const BannerComponent = React.createClass({
  render: function() {
    return (
      <header className={styles.header}>
        <h1 className={styles.heading}>
          <Link to="/">{this.props.name}</Link>
        </h1>
      </header>
    )
  }
})

export default BannerComponent
