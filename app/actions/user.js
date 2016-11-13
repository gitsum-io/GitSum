import {
  SET_USER_TOKEN,
  SET_USER_DETAILS
} from 'constants'

// Set user token
export function setUserToken(token) {
  return {
    type: SET_USER_TOKEN,
    token
  }
}

// Set user details
export function setUserDetails(name) {
  return {
    type: SET_USER_DETAILS,
    name
  }
}
