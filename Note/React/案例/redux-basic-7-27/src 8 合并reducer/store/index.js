import { legacy_createStore, combineReducers } from 'redux'

import * as types from './actionTypes'

// 计数器案例的 reducer
const aReducer = (state = 0, action) => {
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

// todos 案例的 reducer
const bReducer = (state = [], action) => {
  return state
}

// 创建 根reducer
// const rootReducer = combineReducers({
//   a: aReducer,
//   b: bReducer,
// })

// 应该为状态，起一个有意义的名称
const rootReducer = combineReducers({
  count: aReducer,
  todos: bReducer,
  // ...
})

// 将 根reducer 作为参数，传递给 legacy_createStore 函数
// 创建 store
const store = legacy_createStore(rootReducer)

// 验证 redux 状态：
// console.log('redux 状态', store.getState())

// 导出创建好的 store 对象
export default store
