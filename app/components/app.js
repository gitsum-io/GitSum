import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as globalActions from 'actions/globals'
import * as userActions from 'actions/user'
import * as repositoriesActions from 'actions/repositories'
import ViewWrapper from 'components/view-wrapper'

// Map state to props
function mapStateToProps(state) {
  return {
    globals: state.globals,
    repositories: state.repositories,
    user: state.user
  }
}

// Map actions to props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    ...userActions,
    ...globalActions,
    ...repositoriesActions
  }, dispatch)
}

// Connect new props to Main element
const App = connect(mapStateToProps, mapDispatchToProps)(ViewWrapper)

export default App
