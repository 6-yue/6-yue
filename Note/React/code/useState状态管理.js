import { useState } from 'react'
import { createRoot } from 'react-dom/client'

// useState Hook 提供状态
const Hello = () => {
  // 2.调用 useState hook函数，来提供状态以及修改状态的函数
  // 参数表示：状态的默认值
  // 返回值是一个数组
  // const stateArray = useState(10)
  // // 数组中索引为0的元素是：状态
  // const state = stateArray[0]
  // // 数组中索引为1的元素是：修改该状态的函数
  // const setState = stateArray[1]

  // 利用数组结构简化操作
  // 根据操作，使命名更加语义化：use + 状态名称(首字母大写)
  const [count, setCount] = useState(10)

  return (
    <>
      <div>
        <h1>计数器：{count}</h1>
        <button
          onClick={() => {
            // 修改状态
            // 将state + 1 这个表达式的结果，传递给了 setState函数
            // 参数：表示新的状态值，也就是要把状态修改成哪个值
            setCount(count + 1)
          }}
        >
          +1
        </button>
      </div>
    </>
  )
}

const el = (
  <>
    <Hello />
  </>
)

const root = createRoot(document.querySelector('#root'))
root.render(el)
