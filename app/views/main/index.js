import React from 'react'
import styles from './styles.css'
import Banner from 'components/banner'
import RepositoryList from 'components/repository-list'
import { browserHistory } from 'react-router'

const MainComponent = React.createClass({
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
        <Banner {...this.props} />
        <RepositoryList {...this.props} />
      </div>
    )
  }
})

export default MainComponent
