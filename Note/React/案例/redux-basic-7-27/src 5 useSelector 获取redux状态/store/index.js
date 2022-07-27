import { legacy_createStore } from 'redux'

// 使用 if-else 来处理不同的 action
const reducer = (state = 0, action) => {
  if (action.type === 'increment') {
    // +1
    return state + 1
  }

  if (action.type === 'increment1') {
    // + action.payload
    return state + action.payload
  }

  // 处理 Redux 默认的 action 类型 或者说：只要该 reducer 处理不了的 action
  // 都会执行此处的 return
  return state
}

// 创建 store
const store = legacy_createStore(reducer)

// 导出创建好的 store 对象
export default store
