// 1. 导入react 和 react-dom
// 2. 注意：导入react-dom时，需要在包名上加client
import React from 'react';
import ReactDOM from 'react-dom/client';
// 创建React元素

// 1. 第一个参数：表示要创建的HTML元素的名称，比如h1就是创建一个h1元素
// 2. 第二个参数：表示元素自身的属性，如果没有属性，可以传入null，如果有可以传入一个对象
// 3. 第三个参数：表示元素的children子节点
// const el = React.createElement('h1',null,'Hello React') // => <h1>Hello React</h1>
const el = React.createElement(
  'ul',
  {className:'list'},
  // 元素节点
  React.createElement('li',null,'香蕉'),
  React.createElement('li',null,'橘子'),
  React.createElement('li',null,'苹果'),
)


// 渲染React元素
// 1. createRoot 用来创建根节点
// 2. 参数：DOM元素，也就是index.html中id为root的元素
const root = ReactDOM.createRoot(document.getElementById('root'))
// 渲染el元素
root.render(el)