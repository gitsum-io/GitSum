import React from 'react'
import styles from './styles.css'
import OcotoCatIcon from 'assets/images/octocat.svg'
import RemoveIcon from 'assets/images/remove.svg'

const EditRepositoryItem = React.createClass({
  propTypes: {
    repository: React.PropTypes.object,
    removeRepository: React.PropTypes.func,
    index: React.PropTypes.number
  },
  render() {
    return (
      <li className={styles.item}><span className={styles.icon}><OcotoCatIcon className={styles.typeIcon} /></span><span className={styles.name}>{this.props.repository.name}</span><button className={styles.button} type="button" onClick={() => this.props.removeRepository(this.props.index)}><RemoveIcon className={styles.removeIcon}/></button></li>
    )
  }
})

export default EditRepositoryItem
