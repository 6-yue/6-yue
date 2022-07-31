import { createRoot } from 'react-dom/client'

// 导入 bootstrap 样式文件：
import 'bootstrap/dist/css/bootstrap.css'

import App from './App'

const root = createRoot(document.getElementById('root'))
root.render(<App />)
