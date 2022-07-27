// 该文件，用来将多个 reducer 合并为一个
import { combineReducers } from 'redux'

// 导入各个 子reducer
import countReducer from './count'
import todosReducer from './todos'

// 合并
const rootReducer = combineReducers({
  count: countReducer,
  todos: todosReducer,
})

export default rootReducer
