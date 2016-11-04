import React from 'react'
import styles from './styles.css'
import Banner from 'components/banner'
import { connect } from 'react-redux'

const MainComponent = React.createClass({
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
        {this.props.children}
      </div>
    )
  }
})

export default connect()(MainComponent)
