// import {
//   API_ENDPOINT,
//   GITHUB_ENDPOINT,
//   ADD_REPOSITORY,
//   REFRESH_REPOSITORY,
//   REMOVE_REPOSITORY,
//   TOGGLE_REPOSITORY_MENU,
//   ACTIVATE_ADD_FORM,
//   DEACTIVATE_ADD_FORM,
//   ADD_MESSAGE,
//   REMOVE_MESSAGE,
//   SET_USER_TOKEN,
//   SET_USER_DETAILS,
//   CLOSE_OVERLAYS
// } from 'constants'
//
// // Add a repository to the list
// export function addRepository(name, commits, url) {
//   return {
//     type: ADD_REPOSITORY,
//     name,
//     commits,
//     url
//   }
// }
//
// // Refresh a repository
// export function refreshRepository(commits, key) {
//   return {
//     type: REFRESH_REPOSITORY,
//     commits,
//     key
//   }
// }
//
// // Remove a repository from the list
// export function removeRepository(key) {
//   return {
//     type: REMOVE_REPOSITORY,
//     key
//   }
// }
//
// // Toggle the repository menu state
// export function toggleRepositoryMenu(key) {
//   return {
//     type: TOGGLE_REPOSITORY_MENU,
//     key
//   }
// }
//
// // Activate add form
// export function activateAddForm() {
//   return {
//     type: ACTIVATE_ADD_FORM
//   }
// }
//
// // Close add form
// export function deactivateAddForm() {
//   return {
//     type: DEACTIVATE_ADD_FORM
//   }
// }
//
// export function closeOverlays() {
//   return {
//     type: CLOSE_OVERLAYS
//   }
// }
//
// // Add message
// export function addMessage(status, message) {
//   return {
//     type: ADD_MESSAGE,
//     status,
//     message
//   }
// }
//
// // Remove message
// export function removeMessage() {
//   return {
//     type: REMOVE_MESSAGE
//   }
// }
//
// // Set user token
// export function setUserToken(token) {
//   return {
//     type: SET_USER_TOKEN,
//     token
//   }
// }
//
// export function updateUserDetails(name) {
//   return {
//     type: SET_USER_DETAILS,
//     name
//   }
// }
//
// export function setAuthInfo(data) {
//   return {
//     type: SET_AUTH_INFO,
//     data
//   }
// }
//
// // Fetch repository from github
// export function fetchRepository(name, url, key) {
//   let cleanUrl = url
//   if (url.indexOf('http') !== -1) {
//     const cleanGithubRegex = /https:\/\/github.com\/(.*)[\.git]?/i
//     const cleanUrlParts = cleanGithubRegex.exec(url)
//     cleanUrl = cleanUrlParts[1].replace('.git', '')
//   }
//   return dispatch => {
//     dispatch(toggleRepositoryLoading())
//     return fetch(`${GITHUB_ENDPOINT}/repos/${cleanUrl}/commits?client_secret=ddf82d89d9fd6e16704fa39100671da23a045045&client_id=183eb9754ab178e57b49`)
//       .then(response => {
//         dispatch(toggleRepositoryLoading())
//         if (!response.ok) throw Error(response.statusText)
//         return response.json()
//       })
//       .then(commits => {
//         if (Array.isArray(commits)) {
//           if (key !== undefined) {
//             dispatch(refreshRepository(commits, key))
//           } else {
//             dispatch(addRepository(name, commits, url))
//           }
//         } else {
//           const message = {message: 'Invalid repository name'}
//           throw message
//         }
//       })
//       .catch(error => {
//         dispatch(addMessage('error', `Error fetching repository: ${error.message}`))
//       })
//   }
// }
//
