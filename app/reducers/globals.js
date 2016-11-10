import { SET_NAME, ACTIVATE_ADD_FORM, DEACTIVATE_ADD_FORM, ADD_MESSAGE, REMOVE_MESSAGE, TOGGLE_PROFILE_MENU, TOGGLE_REPOSITORY_LOADING, SET_STATE_TOKEN, SET_AUTH_INFO } from '../actions'

export default function global(state = {}, action) {
  switch (action.type) {
  case SET_NAME:
    return Object.assign({}, state, {
      name: action.names
    })
  case SET_STATE_TOKEN:
    return Object.assign({}, state, {
      stateToken: action.token
    })
  case SET_AUTH_INFO:
    return Object.assign({}, state, {
      authInfo: action.data
    })
  case TOGGLE_PROFILE_MENU:
    return Object.assign({}, state, {
      profileMenuOpen: !state.profileMenuOpen
    })
  case TOGGLE_REPOSITORY_LOADING:
    return Object.assign({}, state, {
      repositoryLoading: !state.repositoryLoading
    })
  case ACTIVATE_ADD_FORM:
    return Object.assign({}, state, {
      addFormActive: true
    })
  case DEACTIVATE_ADD_FORM:
    return Object.assign({}, state, {
      addFormActive: false
    })
  case ADD_MESSAGE:
    return Object.assign({}, state, {
      message: {
        text: action.message,
        status: action.status
      }
    })
  case REMOVE_MESSAGE:
    const newState = Object.assign({}, state)
    delete newState.message
    return newState
  default:
    return state
  }
}
