import { useState } from 'react'
import { createRoot } from 'react-dom/client'

const Hello = () => {
  // hook可以多次使用，互不影响
  // 定义hook时，不能改变其执行顺序
  // 1.如不能将其放在 if for 等条件语句中
  // 2.不能嵌套
  const [count, setCount] = useState(5)
  const [loading, setLoading] = useState(true)
  return (
    <>
      <h1>计数器：{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        +1
      </button>
      <button
        onClick={() => {
          setLoading(!loading)
        }}
      >
        切换loading
      </button>
      {loading ? <p>加载完成</p> : <p>加载ing……</p>}
    </>
  )
}

const el = (
  <>
    <Hello></Hello>
  </>
)

const root = createRoot(document.querySelector('#root'))
root.render(el)
