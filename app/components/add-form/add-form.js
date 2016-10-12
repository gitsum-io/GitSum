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
    fetchRepository: React.PropTypes.func,
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
    this.props.deactivateAddForm()
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
              <input name="name" component="input" type="text" placeholder="Name" required onChange={this.setName}/>
              <input name="url" component="input" type="text" placeholder="Url" required onChange={this.setUrl}/>
            </div>
            <div className={styles.formBottom}>
              <p>{this.props.repositories.length}</p>
              <ul className={styles.repositoryList}>
                {this.props.repositories.map((repository) => <li>{repository.name}</li>)}
              </ul>
              <Button className={styles.button} text="Add" />
            </div>
          </form>
        </Modal>
      </div>
    )
  }
})

export default AddForm
