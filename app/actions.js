// Action types
export const API_ENDPOINT = 'http://0.0.0.0:4000/api/v1'
export const SET_NAME = 'SET_NAME'
export const ADD_REPOSITORY = 'ADD_REPOSITORY'
export const REFRESH_REPOSITORY = 'REFRESH_REPOSITORY'
export const REMOVE_REPOSITORY = 'REMOVE_REPOSITORY'
export const TOGGLE_REPOSITORY_MENU = 'TOGGLE_REPOSITORY_MENU'
export const ACTIVATE_ADD_FORM = 'ACTIVATE_ADD_FORM'
export const DEACTIVATE_ADD_FORM = 'DEACTIVATE_ADD_FORM'
export const ADD_MESSAGE = 'ADD_MESSAGE'
export const REMOVE_MESSAGE = 'REMOVE_MESSAGE'
export const SET_USER_TOKEN = 'SET_USER_TOKEN'
export const TOGGLE_PROFILE_MENU = 'TOGGLE_PROFILE_MENU'
export const TOGGLE_REPOSITORY_LOADING = 'TOGGLE_REPOSITORY_LOADING'
export const SET_STATE_TOKEN = 'SET_STATE_TOKEN'
export const SET_USER_DETAILS = 'SET_USER_DETAILS'
export const SET_AUTH_INFO = 'SET_AUTH_INFO'

// Set the name of the application
export function setName(name) {
  return {
    type: SET_NAME,
    name
  }
}

// Toggle the profile menu
export function toggleProfileMenu() {
  return {
    type: TOGGLE_PROFILE_MENU
  }
}

// Toggle the repository loading
export function toggleRepositoryLoading() {
  return {
    type: TOGGLE_REPOSITORY_LOADING
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

// Refresh a repository
export function refreshRepository(commits, key) {
  return {
    type: REFRESH_REPOSITORY,
    commits,
    key
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

// Set user token
export function setUserToken(token) {
  return {
    type: SET_USER_TOKEN,
    token
  }
}

export function updateUserDetails(name) {
  return {
    type: SET_USER_DETAILS,
    name
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

// Fetch repository from github
export function fetchRepository(name, url, key) {
  let cleanUrl = url
  if (url.indexOf('http') !== -1) {
    const cleanGithubRegex = /https:\/\/github.com\/(.*)[\.git]?/i
    const cleanUrlParts = cleanGithubRegex.exec(url)
    cleanUrl = cleanUrlParts[1].replace('.git', '')
  }
  return dispatch => {
    dispatch(toggleRepositoryLoading())
    return fetch(`https://api.github.com/repos/${cleanUrl}/commits?client_secret=ddf82d89d9fd6e16704fa39100671da23a045045&client_id=183eb9754ab178e57b49`)
      .then(response => {
        dispatch(toggleRepositoryLoading())
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .then(commits => {
        if (Array.isArray(commits)) {
          if (key !== undefined) {
            dispatch(refreshRepository(commits, key))
          } else {
            dispatch(addRepository(name, commits, url))
          }
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
// export function authenticateUser(username, password) {
//   return dispatch => {
//     // TODO This url needs to be updated
//     const payload = {
//       method: 'POST',
//       body: {
//         username,
//         password
//       }
//     }
//     if (username === 'nick') { // TODO Remove this debugging line
//       dispatch(setUserToken('68879UITCXD3465RTFCR455YUT34Y'))
//       browserHistory.push('/')
//     }
//     return fetch(`http://nickspiel.me`, payload)
//       .then(response => {
//         if (!response.ok) throw Error(response.statusText)
//         return response.json()
//       })
//       .then(data => {
//         dispatch(setUserToken(data))
//         browserHistory.push('/')
//       })
//       .catch(error => {
//         dispatch(addMessage('error', `There was an error logging you in: ${error.message}`))
//       })
//   }
// }

// Get auth url
export function getAuthInfo() {
  return dispatch => {
    return fetch(`${API_ENDPOINT}/github/auth/info`)
      .then(response => {
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .then(data => {
        // return data
        dispatch(setAuthInfo(data))
      })
      .catch(error => {
        dispatch(addMessage('error', `There was an error connecting the the Gitsum api: ${error.message}`))
      })
  }
}

// Authenticate user
export function getStateToken() {
  return dispatch => {
    return fetch(`http://0.0.0.0:4000/`)
      .then(response => {
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .then(data => {
        console.log(data)
        dispatch(setStateToken('jkladsfkljadsfjkladsjklfdsajklf'))
      })
      .catch(error => {
        dispatch(addMessage('error', `There was an error connecting the the Gitsum api: ${error.message}`))
        dispatch(setStateToken('jkladsfkljadsfjkladsjklfdsajklf')) // TODO Need to remove this once the CORS issue is sorted
      })
  }
}

// Authenticate user
export function sendAuthResponse(data, state) {
  return dispatch => {
    console.log('sending auth response')
    console.log(data)
    const payload = {
      method: 'POST',
      // body: data
      body: 'asdasd'
    }
    return fetch(`${API_ENDPOINT}/github/auth/authorize`, payload)
      .then(response => {
        if (!response.ok) throw Error(response.statusText)
        return response.json()
      })
      .then(data => {
        // TODO Nothing yet, need to know what Rob needs
        console.log('RESPONSE', data)
      })
      .catch(error => {
        dispatch(addMessage('error', `There was an error connecting the the Gitsum api: ${error.message}`))
      })
  }
}
