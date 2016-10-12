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
  default:
    return state
  }
}
