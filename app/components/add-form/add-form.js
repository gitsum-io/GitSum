import React from 'react'

const AddForm = React.createClass({
  getInitialState() {
    return {
      name: ''
    }
  },
  handleSubmit(event) {
    event.preventDefault()
    this.props.fetchRepository(this.state.name)
  },
  setName(event) {
    this.state.name = event.target.value
  },
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input name="name" component="input" type="text" placeholder="Name" onChange={this.setName}/>
        <button>Submit</button>
      </form>
    )
  }
})

export default AddForm
