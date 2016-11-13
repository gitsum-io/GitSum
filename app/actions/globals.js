import {
  SET_NAME,
  TOGGLE_PROFILE_MENU,
  SET_STATE_TOKEN,
  SET_AUTH_INFO,
  TOGGLE_REPOSITORY_LOADING,
  ACTIVATE_ADD_FORM,
  DEACTIVATE_ADD_FORM,
  CLOSE_OVERLAYS,
  ADD_MESSAGE,
  REMOVE_MESSAGE
} from 'constants'

// Set the name of the application
export function setName(name) {
  return {
    type: SET_NAME,
    name
  }
}

// Toggle the repository loading
export function toggleRepositoryLoading() {
  return {
    type: TOGGLE_REPOSITORY_LOADING
  }
}

// Toggle the profile menu
export function toggleProfileMenu() {
  return {
    type: TOGGLE_PROFILE_MENU
  }
}

// Set state token
export function setStateToken(token)  {
  return {
    type: SET_STATE_TOKEN,
    token
  }
}

export function setAuthInfo(data) {
  return {
    type: SET_AUTH_INFO,
    data
  }
}

// Activate add form
export function activateAddForm() {
  return {
    type: ACTIVATE_ADD_FORM
  }
}

// Close add form
export function deactivateAddForm() {
  return {
    type: DEACTIVATE_ADD_FORM
  }
}

// Close over
export function closeOverlays() {
  return {
    type: CLOSE_OVERLAYS
  }
}

// Add message
export function addMessage(status, message) {
  return {
    type: ADD_MESSAGE,
    status,
    message
  }
}

// Remove message
export function removeMessage() {
  return {
    type: REMOVE_MESSAGE
  }
}
