import React from 'react';
import ReactDOM from 'react-dom'
// import App from './App'
// import Lifecycle from './Lifecycle';
// import CartSample from './CartSample';
// import CommentList from './components/CommentList';
import Composition from './components/Composition';
// import Hoc from './components/Hoc';
// import ContextSample from './components/ContextSample';
// import AntdForm from './components/AntdForm';
// import KFormSample from './components/KFormSample';
// import store from './store';
// import ReduxTest from './components/ReduxTest';
// import {Provider} from 'react-redux'
// import RouteSample from './components/RouteSample';

// import myStore from './store/myStore'
// import MyReduxTest from './components/MyReduxTest'


//ReactDOM.render方法会替换之前的内容
// ReactDOM.render(<h1>Hello World</h1>,document.querySelector("#root"));
//  ReactDOM.render(<App/>,document.querySelector('#root'));
//  ReactDOM.render(<Lifecycle/>,document.querySelector('#root'));
//  ReactDOM.render(<CartSample title="我的商品列表"/>,document.querySelector('#root'));

// ReactDOM.render(<CommentList />,document.querySelector('#root'));
ReactDOM.render(<Composition />,document.querySelector('#root'));
// ReactDOM.render(<Hoc contents="My fist Blog!"/>,document.querySelector('#root'));
// ReactDOM.render(<ContextSample/>,document.querySelector('#root'));
// ReactDOM.render(<AntdForm/>,document.querySelector('#root'));
// ReactDOM.render(<KFormSample/>,document.querySelector('#root'));

// React 只会更新必要的部分
// 值得注意的是 React DOM 首先会比较元素内容先后的不同，而在渲染过程中只会更新改变了的部分。
//下面的代码证明，react会通过diff算法值修改变化的部分，此部分变化的是文本，不会更新整个dom
// function tick() {
//     ReactDOM.render(<h2>{new Date().toLocaleTimeString()}</h2>,document.querySelector('#root'));
// }

// setInterval(tick, 1000);


// ReactDOM.render(
//     <Provider store={store}>
//         <ReduxTest />
//     </Provider>
//     ,
//     document.querySelector('#root')
// );

//集成react-redux之前的写法，store的state更新时，通过订阅方式通知组件重新渲染
// function render() {
//     ReactDOM.render(<ReduxTest />, document.querySelector('#root'));
// }

// render();
// store.subscribe(render);

// ReactDOM.render(<RouteSample/>,document.querySelector('#root'));

// 使用自己创建的store存储和管理数据
// function render() {
//     ReactDOM.render(<MyReduxTest />, document.querySelector('#root'));
// }

// render();
// myStore.subscribe(render);