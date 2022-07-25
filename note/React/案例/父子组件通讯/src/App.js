import { useState } from 'react'
import './App.css'

export default function App() {
  const [list, setList] = useState([
    {
      id: 1,
      name: '超级好吃的棒棒糖',
      price: 18.8,
      info: '开业大酬宾，全场8折',
    },
    {
      id: 2,
      name: '超级好吃的大鸡腿',
      price: 34.2,
      info: '开业大酬宾，全场8折',
    },
    {
      id: 3,
      name: '超级无敌的冰激凌',
      price: 14.2,
      info: '开业大酬宾，全场8折',
    },
  ])

  return (
    <div className="parent">
      <h1>父组件</h1>

      <div className="child">
        <div className="product">
          <h3>标题：</h3>
          <div>价格：</div>
          <div>开业大酬宾</div>
        </div>
      </div>
    </div>
  )
}
