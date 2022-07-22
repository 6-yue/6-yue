import { Component } from 'react'
import { createRoot } from 'react-dom/client'

// 函数组件：使用JS中的函数创建的组件
// 1.通过函数的返回值来指定组件的结构
// 2.函数组件的名称首字母必须以大写字母开头

// 1.创建组件
function Hello() {
  function handClick() {
    console.log('我被点击了')
  }
  return <button onClick={handClick}>普通函数组件-点我</button>
}

// 2.箭头函数组件-注册事件-阻止默认行为
const Say = () => {
  const handClick = () => {
    console.log('我被点击了')
  }
  const aClick = (e) => {
    e.preventDefault()
    console.log('我被点击了')
  }
  return (
    <>
      <button onClick={handClick}>箭头函数组件-点我</button>
      <a href="https://archlinux.org" onClick={aClick}>
        Arch
      </a>
    </>
  )
}

// 3.返回null的组件
const Sayhai = () => {}

// 4.类组件
class Sing extends Component {
  render() {
    return <h3>类组件</h3>
  }
}

const el = (
  <>
    <Hello />
    <Say />
    <Sayhai />
    <Sing />
  </>
)

const root = createRoot(document.querySelector('#root'))
root.render(el)
