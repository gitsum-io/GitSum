import {
  SET_USER_TOKEN,
  SET_USER_DETAILS
} from 'constants'

export default function global(state = {}, action) {
  switch (action.type) {
  case SET_USER_TOKEN:
    return Object.assign({}, state, {
      token: action.token
    })
  case SET_USER_DETAILS:
    return Object.assign({}, state, {
      name: action.name
    })
  default:
    return state
  }
}
