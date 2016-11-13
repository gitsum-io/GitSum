import React from 'react'
import styles from './styles.css'
import Modal from 'components/modal'
import ClickMask from 'components/click-mask'
import Button from 'components/button'
import EditRepositoryList from 'components/edit-repository-list'
import CrossIcon from 'assets/images/cross.svg'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { deactivateAddForm } from 'actions/globals'
import { fetchRepository } from 'actions/repositories'

const AddForm = React.createClass({
  propTypes: {
    globals: React.PropTypes.shape({
      addFormActive: React.PropTypes.bool,
    }),
    fetchRepository: React.PropTypes.func.isRequired,
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
  render() {
    const crossIcon = <CrossIcon className={styles.crossIcon} />
    return (
      <div className={styles.addForm}>
        <Modal modalClassName={this.props.globals.addFormActive ? styles.modalOpen : styles.modal}>
          <ClickMask className={styles.clickMask} active={this.props.globals.addFormActive} handleClick={() => this.props.deactivateAddForm()}/>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <Button type="button" icon={crossIcon} className={styles.crossButton} handleClick={() => this.props.deactivateAddForm()} />
            <div className={styles.formTop}>
              <h3 className={styles.heading}>Add a new repository</h3>
              <input name="name" className={styles.input} type="text" placeholder="Name" required onChange={this.setName}/>
              <input name="url" className={styles.input} type="text" placeholder="Url" required onChange={this.setUrl}/>
            </div>
            <div className={styles.formBottom}>
              <EditRepositoryList />
              <div className={styles.actions}>
                <Button className={styles.addButton}>Add</Button>
                <Button className={styles.closeButton} type="button" handleClick={() => this.props.deactivateAddForm()}>Close</Button>
              </div>
            </div>
          </form>
        </Modal>
      </div>
    )
  }
})

function mapStateToProps(state) {
  return { globals: state.globals }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deactivateAddForm, fetchRepository }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AddForm)
