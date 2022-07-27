# redux

1. 概述
   1. 集中式存储和管理应用的状态
   2. 处理组件通讯问题时，无视组件之间的层级关系
   3. 简化大型复杂应用中组件之间的通讯问题
   4. 数据流清晰，易于定位 BUG
2. 开发准备
   1. 创建React项目：`npx create-react-app redux-basic`
   2. 启动项目：`yarn start`
   3. 安装 Redux包：`npm i redux` 或 `yarn add redux`
3. useDispatch
   1. 使用这个hook能得到redux store的dispatch方法引用，通常用于"手动" dispatch action