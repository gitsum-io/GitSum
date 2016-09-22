import 'whatwg-fetch'

export default function repositories(state = [], action) {
  console.log('reducer', action)
  switch (action.type) {
  case 'ADD_REPOSITORY':
    return [...state, {
      name: action.name,
      commits: action.commits
    }]
  default:
    return state
  }
}
