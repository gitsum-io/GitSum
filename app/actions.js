// Action types
export const SET_NAME = 'SET_NAME'
export const ADD_REPOSITORY = 'ADD_REPOSITORY'
export const SET_ADD_REPO_DATA = 'SET_ADD_REPO_DATA'
export const SET_ADD_REPO_DATA = 'SET_ADD_REPO_DATA'

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

// Fetch repository from github
export function fetchRepository(repository) {
  return dispatch => {
    return fetch(`https://api.github.com/repos/${repository}/commits`)
      .then(response => response.json())
      .then(commits => {
        dispatch(addRepository(repository, commits))
      })
      .catch(function(error) {
        // TODO Dispatch error
        console.log(`Error fetching repository: ${error.message}`);
      });
  }
}
