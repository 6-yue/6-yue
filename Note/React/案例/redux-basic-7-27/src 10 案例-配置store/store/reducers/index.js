import { combineReducers } from 'redux'

// 导入子reducer
import cart from './cart'

// 合并
const rootReducer = combineReducers({
  cart,
})

export default rootReducer
