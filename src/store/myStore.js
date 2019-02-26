import {myCreateStore,applyMiddleware} from './myCreateStore'
import counter from './counter.redux'
import logger from 'redux-logger'
//用于处理redux异步请求的中间件
import thunk from 'redux-thunk'

// 创建myCreateStore
export default myCreateStore(counter,applyMiddleware(logger,thunk))