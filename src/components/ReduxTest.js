import React, { Component } from 'react'
// import store from '../store'

import {connect} from 'react-redux'

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

const mapStateToProps = state => ({ num: state });
const mapDispatchToProps = dispatch => ({
  add: () => dispatch({ type: "add" }),
  minus: () => dispatch({ type: "minus" })
});

// @connect(
//     state => ({ num: state }), // 状态映射
//     {
//       add: () => ({ type: "add" }),
//       minus: () => ({ type: "minus" })
//     }
//   )
@connect(mapStateToProps,mapDispatchToProps)
class ReduxTest extends Component {
    render() {
      return (
        <div>
          <p>{this.props.num}</p>        
          <button onClick={()=>this.props.add()}>+</button>
          <button onClick={()=>this.props.minus()}>-</button>
        </div>
      )
    }
  }

  export default ReduxTest;