// TODO Remove this, it is not needed
export default function addForm(state = {}, action) {
  switch (action.type) {
  case 'SET_ADD_REPO_DATA':
    return Object.assign({}, state, {
      name: action.data.name,
      url: action.data.url
    })
  default:
    return state
  }
}
