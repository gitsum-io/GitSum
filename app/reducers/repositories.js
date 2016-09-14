import repositoriesData from '../data/repositories'

export default function repositories(state = [], action) {
  console.log(state, action)
  switch (action.type) {
  case 'SET_NAME':
  console.log('SET_NAME')
  console.log('STATE', state)
  console.log('NEW_STATE', Object.assign({}, state, { name: action.name }))
    return Object.assign({}, state, {
      name: action.name
    })
  case 'ANOTHER_ACTION':
    return state
  }
  return state
}

export function global(state = [], action) {
  console.log(state, action)
  return state
}
