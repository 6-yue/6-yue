import { createRoot } from 'react-dom/client'
import { useState } from 'react'

const Hello = (props) => {
  console.log('接收的参数', props)
  return (
    <>
      <p>姓名：{props.name}</p>
      <p>年龄：{props.age}</p>
      {props.fn()}
      {props.node}
    </>
  )
}
const Parent = () => {
  const [money] = useState(10000)
  return (
    <div className="parent">
      <h1>父组件</h1>
      <Child money={money} />
    </div>
  )
}
const Child = (props) => {
  return <span className="child">子组件{props.money}</span>
}
const el = (
  <>
    <Hello
      name="jack"
      age={19}
      isLoading={false}
      fn={() => <h2>值为函数的prop</h2>}
      node={<h1>值为JSX的prop</h1>}
    />
    <Parent />
  </>
)

const root = createRoot(document.querySelector('#root'))
root.render(el)
