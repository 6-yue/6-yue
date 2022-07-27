import { legacy_createStore } from 'redux'

// 创建 reducer
const reducer = (state = 10, action) => {
  switch (action.type) {
    case 'increment':
      // +1
      return state + 1
    case 'increment1':
      // 加多少，是有 action 中的 payload 属性指定的
      return state + action.payload
    default:
      return state
  }
}

// 创建 store
const store = legacy_createStore(reducer)

store.subscribe(() => {
  console.log('Redux 状态值：', store.getState())
})

store.dispatch({ type: 'increment' })

// 计数器数量增加，加多少动态指定的
store.dispatch({ type: 'increment1', payload: 2 })
store.dispatch({ type: 'increment1', payload: 10 })
