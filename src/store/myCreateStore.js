// redux 的createStore实现代码
export function myCreateStore(reducer, enhancer) {
    if (enhancer) {
        return enhancer(myCreateStore)(reducer);
    }

    let currentState;
    let currentListeners = [];

    function getState() {
        return currentState;
    }

    function subscribe(listener) {
        currentListeners.push(listener);
    }

    function dispatch(action) {
        currentState = reducer(currentState, action);
        currentListeners.forEach(v => v());
        return action
    }

    dispatch({ type: '@IMOOC/WONIU-REDUX' });

    return { getState, subscribe, dispatch }
}

export function applyMiddleware(...middlewares) {
    console.log(middlewares)
    return myCreateStore => (...args) => {
        console.log(args)
        const store = myCreateStore(...args);
        let dispatch = store.dispatch

        const midApi = {
            getState: store.getStat,
            dispatch: (...args) => dispatch(...args)
        }

        const middlewareChain = middlewares.map(middleware => middleware(midApi))
        dispatch = compose(...middlewareChain)(store.dispatch)
        return {
            ...store,
            dispatch
        }
    }
}

// applyMiddleware编译后的代码，enhancer(myCreateStore)(reducer);
// function applyMiddleware() {
//     //此处的arguments是middlewares
//     for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
//         middlewares[_key] = arguments[_key];
//     }

//     console.log(middlewares);
//     return function (myCreateStore) {
//         return function () {
//             //此处的arguments是reducer
//             for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
//                 args[_key2] = arguments[_key2];
//             }

//             console.log(args);
//             var store = myCreateStore.apply(void 0, args);
//             var _dispatch = store.dispatch;
//             var midApi = {
//                 getState: store.getStat,
//                 dispatch: function dispatch() {
//                     return _dispatch.apply(void 0, arguments);
//                 }
//             };
//             var middlewareChain = middlewares.map(function (middleware) {
//                 return middleware(midApi);
//             });
//             _dispatch = compose.apply(void 0, Object(middlewareChain))(store.dispatch);
//             return Object({}, store, {
//                 dispatch: _dispatch
//             });
//         };
//     };
// }

export function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((f1, f2) => (...args) => f1(f2(...args)))
}

// function compose() {
//     for (var _len3 = arguments.length, funcs = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
//       funcs[_key3] = arguments[_key3];
//     }

//     if (funcs.length === 0) {
//       return function (arg) {
//         return arg;
//       };
//     }

//     if (funcs.length === 1) {
//       return funcs[0];
//     }

//     return funcs.reduce(function (f1, f2) {
//       return function () {
//         return f1(f2.apply(void 0, arguments));
//       };
//     });
// }