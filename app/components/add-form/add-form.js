import React from 'react'
import Modal from '../modal/modal'
import ClickMask from '../click-mask/click-mask'
import Button from '../button/button'
import styles from './styles.css'
import EditRepositoryList from '../edit-repository-list'
import AddIcon from '../../assets/images/add-icon.svg'
import CrossIcon from '../../assets/images/cross.svg'

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
    const addIcon = <AddIcon className={styles.addIcon} />
    const crossIcon = <CrossIcon className={styles.crossIcon} />
    return (
      <div className={styles.addForm}>
        <Button icon={addIcon} additionalClassName={styles.addFormButton} text="Add Repository" handleClick={this.showForm} />
        <Modal modalClassName={this.props.globals.addFormActive ? styles.modalOpen : styles.modal}>
          <ClickMask active={this.props.globals.addFormActive} handleClick={() => this.props.deactivateAddForm()}/>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <Button type="button" icon={crossIcon} additionalClassName={styles.crossButton} handleClick={() => this.props.deactivateAddForm()} />
            <div className={styles.formTop}>
              <h3 className={styles.heading}>Add a new repository</h3>
              <input name="name" type="text" placeholder="Name" required onChange={this.setName}/>
              <input name="url" type="text" placeholder="Url" required onChange={this.setUrl}/>
            </div>
            <div className={styles.formBottom}>
              <EditRepositoryList {...this.props} />
              <div className={styles.actions}>
                <Button additionalClassName={styles.addButton} text="Add" />
                <Button additionalClassName={styles.closeButton} type="button" text="Close" handleClick={() => this.props.deactivateAddForm()} />
              </div>
            </div>
          </form>
        </Modal>
      </div>
    )
  }
})

export default AddForm
