import { useSelector, useDispatch } from 'react-redux'

import * as types from './store/actionTypes'

const App = () => {
  // 由于当前 redux 的状态就是一个数值，所以，此处直接将 state 返回即可
  const count = useSelector(state => state.count)
  // 获取 dispatch 函数，此处的 dispatch 相当于 store.dispatch
  const dispatch = useDispatch()

  console.log('count:', count)

  return (
    <div>
      <h1>计数器：{count}</h1>
      <button onClick={() => dispatch({ type: types.INCREMENT1, payload: 5 })}>
        +1
      </button>
    </div>
  )
}

export default App
