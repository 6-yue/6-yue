# redux

## 概述

1. 集中式存储和管理应用的状态
2. 处理组件通讯问题时，无视组件之间的层级关系
3. 简化大型复杂应用中组件之间的通讯问题
4. 数据流清晰，易于定位 BUG

## 开发准备

1. 创建React项目：`npx create-react-app redux-basic`
2. 启动项目：`yarn start`
3. 安装 Redux包：`npm i redux` 或 `yarn add redux`

## 核心概念

1. action -> reducer -> store
2. action(动作)：描述要做的事情

   1. 使用JS对象来表示，必须带有`type`属性，用于区分动作的类型
   2. 根据功能的不同，可以携带额外的数据，(比如，`payload`有效载荷，也就是附带的额外的数据)，配合该数据来完成相应功能

3. reducer(函数)：更新状态
   1. 函数，用来处理action并更新状态，是Redux状态更新的地方
   2. 函数签名为：`(prevState, action) => newState`
   3. 接收上一次的状态和action作为参数，根据 action 的类型，执行不同操作，最终返回新的状态
   4. 该函数一定要有返回值，即使状态没有改变也要返回上一次的状态

4. store(仓库)：整合action和reducer
   1. 仓库，Redux的核心，整合action 和 reducer
   2. 一个应用只有一个 store
   3. 维护应用的状态，获取状态：`store.getState()`
   4. 发起状态更新时，需要分发action：`store.dispatch(action)`
   5. 创建store时接收reducer作为参数：`const store = createStore(reducer)`
   6. 订阅(监听)状态变化：`const unSubscribe = store.subscribe(() => {})`
   7. 取消订阅状态变化：`unSubscribe()`


## 代码执行流程

1. 创建store时，Redux就会先调用一次redux，来获取到默认状态
2. 分发动作`store.dispatch(action)`更新状态
3. Redux store调用reducer传入：上一次的状态(当前示例中就是：`10`)和action(`{type:'increment'}`)，计算出新的状态并返回
4. reducer执行完毕后，将最新的状态交给store,store用最新的状态替换旧状态，状态更新完毕

## react-redux

1. React(`f(state) => UI`)和Redux(状态管理)是两个独立的库，两者之间职责独立。因此，为了实现在React中使用Redux进行状态管理，就需要一种机制，将这两个独立的库关联在一起。这时候就用到React-Redux这个绑定库了。
2. 作用：为React接入Redux,实现在React中使用Redux进行状态管理
3. React-redux库是Redux官方提供的React绑定库。

### 基本使用

1. 安装react-redux:`yarn add react-redux`
2. 从react-redux中导入Provider组件
3. 导入创建好的redux仓库
4. 使用Provider包裹整个应用
5. 将导入的store设置为Provider的store属性值

```jsx
// 导入Provider组件
import { provider } from 'react-redux'
// 导入创建好的 store 这里的 ./store 是封装好的模块
import store from './store'
root.render(
	<Provider store={store}>
  	<App />
  </Provider>
)
```

### useSelect(获取状态)

1. 

## 难点

1. useDispatch
   1. 使用这个hook能得到redux store的dispatch方法引用，通常用于"手动" dispatch action