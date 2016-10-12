import React from 'react'
// import styles from './styles.css'

const Modal = React.createClass({
  propTypes: {
    children: React.PropTypes.oneOfType([
      React.PropTypes.arrayOf(React.PropTypes.node),
      React.PropTypes.node
    ]),
    modalClassName: React.PropTypes.string
  },
  render() {
    return (
      <div className={this.props.modalClassName}>{this.props.children}</div>
    )
  }
})

export default Modal
