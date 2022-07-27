import * as types from '../actionTypes'

// 计数器案例的 reducer
const countReducer = (state = 0, action) => {
  if (action.type === types.INCREMENT) {
    // +1
    return state + 1
  }

  if (action.type === types.INCREMENT1) {
    // + action.payload
    return state + action.payload
  }

  // 处理 Redux 默认的 action 类型 或者说：只要该 reducer 处理不了的 action
  // 都会执行此处的 return
  return state
}

export default countReducer
