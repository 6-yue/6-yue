import { legacy_createStore } from 'redux'

// 导入 根reducer
import rootReducer from './reducers'

// 创建 store
const store = legacy_createStore(rootReducer)

// 导入 store
export default store
