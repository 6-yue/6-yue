import { useSelector, useDispatch } from 'react-redux'
// import { INCREMENT1 } from './store/actionTypes'
import * as types from './store/actionTypes'

const App = () => {
  // 由于当前 redux 的状态就是一个数值，所以，此处直接将 state 返回即可
  const count = useSelector(state => state)
  // 获取 dispatch 函数，此处的 dispatch 相当于 store.dispatch
  const dispatch = useDispatch()

  return (
    <div>
      <h1>计数器：{count}</h1>
      {/* +1 */}
      {/* <button onClick={() => dispatch({ type: 'increment' })}>+1</button> */}

      {/* + action.payload */}
      <button onClick={() => dispatch({ type: types.INCREMENT1, payload: 5 })}>
        +1
      </button>
    </div>
  )
}

export default App
