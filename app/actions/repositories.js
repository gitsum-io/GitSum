import {
  ADD_REPOSITORY,
  REFRESH_REPOSITORY,
  REMOVE_REPOSITORY,
  TOGGLE_REPOSITORY_MENU
} from 'constants'

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
