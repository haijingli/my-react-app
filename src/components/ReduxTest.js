import React, { Component } from 'react'
// import store from '../store'

import { connect } from 'react-redux'

// export default class ReduxTest extends Component {
//   render() {
//     return (
//       <div>
//         <p>{store.getState()}</p>        
//         <button onClick={()=>store.dispatch({type:'minus'})}>-</button>
//         <button onClick={()=>store.dispatch({type:'add'})}>+</button>
//       </div>
//     )
//   }
// }

// const mapStateToProps = state => ({ num: state });
// const mapDispatchToProps = dispatch => ({
//   add: () => dispatch({ type: "add" }),
//   minus: () => dispatch({ type: "minus" }),
//   asyncAdd: () => {
//     //模拟异步操作，redux-thunk中间件对函数返回值还是函数的请求进行异步处理,
//     //此写法不会调用thunk
//     setTimeout(() => {
//       dispatch({ type: "add" })
//     }, 1000);
//   }
// });

@connect(
  state => ({ num: state }), // 状态映射
  {
    add: () => ({ type: "add" }),
    minus: () => ({ type: "minus" }),
    asyncAdd: () => (dispatch) => {
      //模拟异步操作，redux-thunk中间件对函数返回值还是函数的请求进行异步处理
      setTimeout(() => {
        dispatch({ type: "add" })
      }, 1000);
    }
  }
)
// @connect(mapStateToProps, mapDispatchToProps)
class ReduxTest extends Component {
  render() {
    return (
      <div>
        <p>{this.props.num}</p>
        <button onClick={() => this.props.add()}>+</button>
        <button onClick={() => this.props.minus()}>-</button>
        <button onClick={() => this.props.asyncAdd()}>asyncAdd</button>
      </div>
    )
  }
}

export default ReduxTest;