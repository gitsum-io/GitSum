export default function global(state = {}, action) {
  switch (action.type) {
  case 'SET_USER_TOKEN':
    return Object.assign({}, state, {
      token: action.token
    })
  default:
    return state
  }
}
