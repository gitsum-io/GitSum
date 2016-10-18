export default function global(state = {}, action) {
  switch (action.type) {
  case 'SET_NAME':
    return Object.assign({}, state, {
      name: action.names
    })
  case 'ACTIVATE_ADD_FORM':
    return Object.assign({}, state, {
      addFormActive: true
    })
  case 'DEACTIVATE_ADD_FORM':
    return Object.assign({}, state, {
      addFormActive: false
    })
  case 'ADD_MESSAGE':
    return Object.assign({}, state, {
      message: {
        text: action.message,
        status: action.status
      }
    })
  case 'REMOVE_MESSAGE':
    const newState = Object.assign({}, state)
    delete newState.message
    return newState
  default:
    return state
  }
}
