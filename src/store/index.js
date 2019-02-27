import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger'
//用于处理redux异步请求的中间件
import thunk from 'redux-thunk'
import counter from './counter.redux'
import user from './user.redux'
// 创建中间件的组件
import createSagaMiddleWare from 'redux-saga'
import mySaga from './sagas';

// 1、创建中间件
const mid = createSagaMiddleWare();

//2、应用中间件
const store = createStore(
    // combineReducers({counter})可以组合多个Reducer，实现模块化加载
    combineReducers({ counter, user }),
    // applyMiddleware应用哪些中间件
    applyMiddleware(logger, mid)
);
//3、运行中间件
mid.run(mySaga)
export default store