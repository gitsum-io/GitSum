import React from 'react'
import styles from './styles.css'
import AddRepositoryIcon from 'assets/images/add-repository.svg'

const Instructions = React.createClass({
  render() {
    return (
      <div className={styles.instructions}>
        <AddRepositoryIcon />
        <h2 className={styles.heading}>Add your first repository!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et fermentum arcu. Phasellus id velit et mi tincidunt iaculis ac nec orci. Nulla quis leo nisl.</p>
      </div>
    )
  }
})

export default Instructions
