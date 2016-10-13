// Action types
export const SET_NAME = 'SET_NAME'
export const ADD_REPOSITORY = 'ADD_REPOSITORY'
export const REMOVE_REPOSITORY = 'REMOVE_REPOSITORY'
export const TOGGLE_REPOSITORY_MENU = 'TOGGLE_REPOSITORY_MENU'
export const ACTIVATE_ADD_FORM = 'ACTIVATE_ADD_FORM'
export const DEACTIVATE_ADD_FORM = 'DEACTIVATE_ADD_FORM'

// Set the name of the application
export function setName(name) {
  return {
    type: SET_NAME,
    name
  }
}

// Add a repository to the list
export function addRepository(name, commits) {
  return {
    type: ADD_REPOSITORY,
    name,
    commits
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

// Fetch repository from github
export function fetchRepository(name, url) {
  const cleanGithubRegex = /https:\/\/github.com\/(.*).git/i
  const cleanURL = cleanGithubRegex.exec(url)
  return dispatch => {
    if (!Array.isArray(cleanURL)) {
      console.log(`Error fetching repository: That is not a valid repository`)
    } else {
      return fetch(`https://api.github.com/repos/${cleanURL[1]}/commits`)
        .then(response => {
          if (!response.ok) throw Error(response.statusText)
          return response.json()
        })
        .then(commits => {
          if (Array.isArray(commits)) {
            dispatch(addRepository(name, commits))
          } else {
            const message = {message: 'Invalid repository name'}
            throw message
          }
        })
        .catch(error => {
          // TODO Dispatch errors
          console.log(`Error fetching repository: ${error.message}`)
        })
    }
  }
}
