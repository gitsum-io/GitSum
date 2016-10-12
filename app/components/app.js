import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actionCreators from '../actions'
import Main from './main/main'

// Map state to props
function mapStateToProps(state) {
  return {
    globals: state.globals,
    repositories: state.repositories
  }
}

// Map actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch)
}

// Connect new props to Main element
const App = connect(mapStateToProps, mapDispatchToProps)(Main)

export default App
