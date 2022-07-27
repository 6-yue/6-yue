import { useSelector } from 'react-redux'

const App = () => {
  // 在 App 组件中，获取 redux 中的状态
  // 参数：回调函数，用来从 redux 的状态中，获取到你当前组件需要的状态
  // const count = useSelector(state => {
  //   console.log('redux 状态：', state)
  //   // 通过该回调函数的返回值，来将要获取的状态返回
  //   return state
  // })

  // 由于当前 redux 的状态就是一个数值，所以，此处直接将 state 返回即可
  const count = useSelector(state => state)
  // console.log('count', count)

  return (
    <div>
      <h1>计数器：{count}</h1>
      <button>+1</button>
    </div>
  )
}

export default App
