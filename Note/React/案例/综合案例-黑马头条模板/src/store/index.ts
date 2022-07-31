// 创建 store
import { legacy_createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer } from './reducers'

const middlewares = composeWithDevTools(applyMiddleware(thunk))
const store = legacy_createStore(rootReducer, middlewares)

export default store
