import { createStore,applyMiddleware,combineReducers } from 'redux';
import logger from 'redux-logger'
//用于处理redux异步请求的中间件
import thunk from 'redux-thunk'
const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case 'add':
            return state + 1;
        case 'minus':
            return state - 1;
        default:
            return state;
    }
}

export default createStore(counterReducer,applyMiddleware(logger,thunk));
