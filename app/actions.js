/*
 * action types
 */

export const SET_NAME = 'SET_NAME'
export const ANOTHER_ACTION = 'ANOTHER_ACTION'

/*
 * action creators
 */

export function setName(name) {
  return { type: SET_NAME, name }
}

export function anotherAction(text) {
  return { type: ANOTHER_ACTION, text }
}
