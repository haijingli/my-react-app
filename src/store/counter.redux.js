export default (state = 0, action) => {
    switch (action.type) {
        case 'add':
            return state + 1;
        case 'minus':
            return state - 1;
        default:
            return state;
    }
}

function add() {
    return { type: "add" }
}

function minus() {
    return { type: "minus" }
}

function asyncAdd() {
    return (dispatch,getState) => {
        console.log(getState());
        
        //模拟异步操作，redux-thunk中间件对函数返回值还是函数的请求进行异步处理
        setTimeout(() => {
            dispatch({ type: "add" })
        }, 1000);
    }
}

export { add, minus, asyncAdd }