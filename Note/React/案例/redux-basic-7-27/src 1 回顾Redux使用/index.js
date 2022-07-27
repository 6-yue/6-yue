import { legacy_createStore } from 'redux'

// 创建 reducer
// 参数：
//  1 state 状态
//  2 action 动作
// 返回值：一定要有返回值，返回的值就是 最新的状态
// Redux 内部在调用 reducer 后，会拿到本次调用的 返回值，这个返回值就是 最新的状态值
// 每次调用后，Redux 都会用这个最新的状态来替换 Redux 中的旧状态值。 这样，每次调用后就会更新 Redux 中的状态值了
const reducer = (state = 10, action) => {
  // console.log('state', state, 'action', action)
  switch (action.type) {
    case 'increment':
      // +1
      return state + 1
    default:
      return state
  }
}

// 创建 store
const store = legacy_createStore(reducer)

// 在创建 store 的时候， Redux 就会默认调用一次 reducer
// 目的： 为了获取状态默认值
console.log('状态默认值为：', store.getState())

// 分发动作，来发起状态更新
//  dispatch() 是告诉 Redux 要发起一个状态更新
//  也就是告诉 Redux 要使用该 action 来调用 reducer 函数
//  注意：在 分发动作 的时候，不需要传入 状态 参数，因为 Redux 就是做状态管理的
//       Redux 内部会保存状态的值，所以，在 分发动作 的时候，只需要告诉 Redux 要分发的 action 即可
//       Redux 内部会自动拿到上一次的状态值，和本次出入的 action 来调用 reducer
store.dispatch({ type: 'increment' })
console.log('状态最新值为：', store.getState()) // 11

store.dispatch({ type: 'increment' })
console.log('状态最新值为：', store.getState()) // 12
