// 引入
import ReactDOM from 'react-dom/client'
import './index.css'
import { car, Fruits, name, age, list } from '../src 基础/goods.js'

// 在JSX中使用表达式
// 假设有 name 和 age 两个数据
// 如果需要在 JSX中使用这两个数据，就需要通过 {} 语法来使用
// {} 中可以提供任意的 JS 表达式
// 定义元素
const el = (
  <>
    <h3 style={{ color: '#977258' }}>
      姓名：{name}
      <br />
      年龄：{age}
    </h3>
    <h3>水果</h3>
    <ul>
      {Fruits.map((item, index) => {
        return <li key={index}>{item}</li>
      })}
    </ul>
    <h3>名车</h3>
    <ul>
      {car.map((item, index) => {
        return <li key={index}>{item}</li>
      })}
    </ul>
    <h3>练习信息</h3>
    <ul>
      {list.map((item, index) => {
        return (
          <li key={index}>
            <h3>校址-{item.name}</h3>
            <p>薪资-{item.salary}</p>
          </li>
        )
      })}
    </ul>
  </>
)

// 获取元素
const root = ReactDOM.createRoot(document.querySelector('#root'))

// 渲染
root.render(el)
