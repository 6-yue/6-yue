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

   1. reducer(函数)：更新状态
   2. store(仓库)：整合action和reducer

1. useDispatch
   1. 使用这个hook能得到redux store的dispatch方法引用，通常用于"手动" dispatch action