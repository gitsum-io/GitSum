export default function repositories(state = [], action) {
  switch (action.type) {
  case 'ADD_REPOSITORY':
    return [...state, {
      name: action.name,
      commits: action.commits
    }]
  case 'REMOVE_REPOSITORY':
    return [
      ...state.slice(0, action.key),
      ...state.slice(action.key + 1)
    ]
  default:
    return state
  }
}
