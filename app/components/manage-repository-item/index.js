import React from 'react'
import styles from './styles.css'
import OcotoCatIcon from 'assets/images/octocat.svg'
import RemoveIcon from 'assets/images/remove.svg'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { removeRepository } from 'actions/repositories'

const ManageRepositoryItem = React.createClass({
  propTypes: {
    repository: React.PropTypes.object,
    removeRepository: React.PropTypes.func,
    index: React.PropTypes.number
  },
  render() {
    return (
      <tr className={styles.item}>
        <td className={styles.icon}>
          <OcotoCatIcon className={styles.typeIcon} />
          <span className={styles.name}>{this.props.repository.name}</span>
          <button className={styles.button} type="button" onClick={() => this.props.removeRepository(this.props.index)}>
          <RemoveIcon className={styles.removeIcon}/></button>
        </td>
      </tr>
    )
  }
})

function bindDispatchToProps(dispatch) {
  return bindActionCreators({ removeRepository }, dispatch)
}

export default connect(null, bindDispatchToProps)(ManageRepositoryItem)
