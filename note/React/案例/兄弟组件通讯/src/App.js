import React, { Component } from 'react'
import './App.css'

// 导入两个子组件
import Jack from './Jack'
import Rose from './Rose'

// App 是父组件
export default class App extends Component {
  render() {
    return (
      <div className="app">
        <h1>我是App组件</h1>
        {/* 兄弟组件 1 */}
        <Jack></Jack>
        {/* 兄弟组件 2 */}
        <Rose></Rose>
      </div>
    )
  }
}
