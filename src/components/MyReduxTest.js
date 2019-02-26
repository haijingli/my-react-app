import React, { Component } from 'react'
import myStore from '../store/myStore'
// 自己实现的createStore测试例子
export default class ReduxTest extends Component {
  render() {
    return (
      <div>
        <p>{myStore.getState()}</p>        
        <button onClick={()=>myStore.dispatch({type:'minus'})}>-</button>
        <button onClick={()=>myStore.dispatch({type:'add'})}>+</button>
      </div>
    )
  }
}
