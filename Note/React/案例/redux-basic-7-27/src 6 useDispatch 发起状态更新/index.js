import { createRoot } from 'react-dom/client'

// 导入链接库，用来在 react 中使用 redux
import { Provider } from 'react-redux'

import App from './App'

// 导入 store
// 对于导入来说， index.js 可以省略
// import store from './store/index.js'
import store from './store'

const root = createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
