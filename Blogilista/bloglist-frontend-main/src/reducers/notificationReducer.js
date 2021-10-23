/* eslint-disable linebreak-style */
export const notificationReducer1 = (state = null, action) => {
  if(action.type === 'SHOW') return action.content
  return state
}
let timeoutId

export const setNotification1 = (content, time) => {
  console.log(content)
  return async dispatch => {
    dispatch ({
      type: 'SHOW',
      content: content
    })
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'SHOW',
        content: null
      })
    }, time*1000)
  }
}