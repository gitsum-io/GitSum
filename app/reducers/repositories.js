import {
  ADD_REPOSITORY,
  REFRESH_REPOSITORY,
  REMOVE_REPOSITORY,
  TOGGLE_REPOSITORY_MENU
} from 'constants'

export default function repositories(state = [], action) {
  switch (action.type) {
  // TODO Determine if this is a new or existing repo
  // TODO Validate required data is available
  case ADD_REPOSITORY:
    return [{
      name: action.name,
      commits: action.commits,
      url: action.url
    }, ...state]
  case REFRESH_REPOSITORY:
    const newRepositoryState = Object.assign({}, state[action.key], {
      commits: action.commits,
    })
    return [
      ...state.slice(0, action.key),
      newRepositoryState,
      ...state.slice(action.key + 1)
    ]
  case REMOVE_REPOSITORY:
    return [
      ...state.slice(0, action.key),
      ...state.slice(action.key + 1)
    ]
  case TOGGLE_REPOSITORY_MENU:
    const currentMenuState = state[action.key].menuOpen
    const newMenuState = Object.assign({}, state[action.key], {
      menuOpen: !currentMenuState
    })
    return [
      ...state.slice(0, action.key),
      newMenuState,
      ...state.slice(action.key + 1)
    ]
  default:
    return state
  }
}
