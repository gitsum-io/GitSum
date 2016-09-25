export default function global(state = {}, action) {
  switch (action.type) {
  case 'SET_NAME':
    return Object.assign({}, state, {
      name: action.names
    })
  default:
    return state
  }
}
