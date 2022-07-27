import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
// 导入 bootstrap 样式文件：
import 'bootstrap/dist/css/bootstrap.css'

import App from './App'

// 导入 store
import store from './store'

const root = createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
