import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger'
//用于处理redux异步请求的中间件
import thunk from 'redux-thunk'
import counter from './counter.redux'
import user from './user.redux'

export default createStore(
    // combineReducers({counter})可以组合多个Reducer，实现模块化加载
    combineReducers({ counter, user }),
    // applyMiddleware应用哪些中间件
    applyMiddleware(logger, thunk)
);
