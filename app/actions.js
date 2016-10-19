import { browserHistory } from 'react-router'

// Action types
export const SET_NAME = 'SET_NAME'
export const ADD_REPOSITORY = 'ADD_REPOSITORY'
export const REMOVE_REPOSITORY = 'REMOVE_REPOSITORY'
export const TOGGLE_REPOSITORY_MENU = 'TOGGLE_REPOSITORY_MENU'
export const ACTIVATE_ADD_FORM = 'ACTIVATE_ADD_FORM'
export const DEACTIVATE_ADD_FORM = 'DEACTIVATE_ADD_FORM'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'

// Set the name of the application
export function setName(name) {
  return {
    type: SET_NAME,
    name
  }
}

// Add a repository to the list
export function addRepository(name, commits, url) {
  return {
    type: ADD_REPOSITORY,
    name,
    commits,
    url
  }
}

// Remove a repository from the list
export function removeRepository(key) {
  return {
    type: REMOVE_REPOSITORY,
    key
  }
}

// Toggle the repository menu state
export function toggleRepositoryMenu(key) {
  return {
    type: TOGGLE_REPOSITORY_MENU,
    key
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

// Fetch repository from github
export function fetchRepository(name, url) {
  let cleanUrl = url
  if (url.indexOf('http') !== -1) {
    const cleanGithubRegex = /https:\/\/github.com\/(.*)[\.git]?/i
    const cleanUrlParts = cleanGithubRegex.exec(url)
    cleanUrl = cleanUrlParts[1].replace('.git', '')
  }
  return dispatch => {
    return fetch(`https://api.github.com/repos/${cleanUrl}/commits`)
      .then(response => {
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .then(commits => {
        if (Array.isArray(commits)) {
          dispatch(addRepository(name, commits, url))
        } else {
          const message = {message: 'Invalid repository name'}
          throw message
        }
      })
      .catch(error => {
        dispatch(addMessage('error', `Error fetching repository: ${error.message}`))
      })
  }
}

// Authenticate user
export function authenticateUser(username, password) {
  return dispatch => {
    // TODO This url needs to be updated
    const payload = {
      method: 'POST',
      body: {
        username,
        password
      }
    }
    if (username === 'nick') browserHistory.push('/') // TODO Remove this debugging line
    return fetch(`http://nickspiel.me`, payload)
      .then(response => {
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .then(data => {
        console.log(data)
        browserHistory.push('/')
      })
      .catch(error => {
        dispatch(addMessage('error', `There was an error logging you in: ${error.message}`))
      })
  }
}
