import React, { Component } from 'react'
import store from '../store'

export default class ReduxTest extends Component {
  render() {
    return (
      <div>
        <p>{store.getState()}</p>        
        <button onClick={()=>store.dispatch({type:'minus'})}>-</button>
        <button onClick={()=>store.dispatch({type:'add'})}>+</button>
      </div>
    )
  }
}
