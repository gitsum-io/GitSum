import {
  ADD_REPOSITORY,
  REFRESH_REPOSITORY,
  REMOVE_REPOSITORY,
  TOGGLE_REPOSITORY_MENU,
  GITHUB_ENDPOINT
} from 'constants'

import addMessage from 'action/globals'
import toggleRepositoryLoading from 'action/repositories'

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
    return fetch(`${GITHUB_ENDPOINT}/repos/${cleanUrl}/commits?client_secret=ddf82d89d9fd6e16704fa39100671da23a045045&client_id=183eb9754ab178e57b49`)
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
