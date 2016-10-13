import React from 'react'
import Modal from '../modal/modal'
import ClickMask from '../click-mask/click-mask'
import Button from '../button/button'
import styles from './styles.css'

const AddForm = React.createClass({
  propTypes: {
    globals: React.PropTypes.shape({
      addFormActive: React.PropTypes.bool,
    }),
    fetchRepository: React.PropTypes.func.isRequired,
    activateAddForm: React.PropTypes.func,
    deactivateAddForm: React.PropTypes.func,
    repositories: React.PropTypes.array
  },
  getInitialState() {
    return {
      name: '',
      url: ''
    }
  },
  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchRepository(this.state.name, this.state.url)
  },
  setName(event) {
    this.state.name = event.target.value
  },
  setUrl(event) {
    this.state.url = event.target.value
  },
  showForm() {
    this.props.activateAddForm()
  },
  render() {
    return (
      <div className={styles.addForm}>
        <Button text="Add Repository" handleClick={this.showForm} />
        <Modal modalClassName={this.props.globals.addFormActive ? styles.modalOpen : styles.modal}>
          <ClickMask active={this.props.globals.addFormActive} handleClick={() => this.props.deactivateAddForm()}/>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <div className={styles.formTop}>
              <h3 className={styles.heading}>Add a new repository</h3>
              <input name="name" type="text" placeholder="Name" required onChange={this.setName}/>
              <input name="url" type="text" placeholder="Url" required onChange={this.setUrl}/>
            </div>
            <div className={styles.formBottom}>
              <p>{this.props.repositories.length}</p>
              <ul className={styles.repositoryList}>
                {this.props.repositories.map((repository) => <li>{repository.name}</li>)}
              </ul>
              <Button className={styles.button} text="Add" />
              <button onClick={() => this.props.deactivateAddForm()}>Close</button>
            </div>
          </form>
        </Modal>
      </div>
    )
  }
})

export default AddForm
