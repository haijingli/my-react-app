import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// import Button from 'antd/lib/button';
// import 'antd/dist/antd.css'

import {Button} from 'antd';


// 函数组件，必须传入props
function Welcome(props) {
  return (
    <div>
      <h2>Hello {props.name}!</h2>
    </div>
  )
}

export default class App extends Component {
  //当使用状态时，需要构造函数
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      count: 0
    }
  }

  // 组件挂载后
  componentDidMount() {
    this.timer = setInterval(() => {
      //setState常用法(一)：
      this.setState({
        date: new Date()
      })
    }, 1000);

    // this.setState({
    //   //当要修改的值依赖于之前的state时，应该用函数的写法,下面的写法可能无法返回预期的值
    //   count:this.state.count + 1
    // })

    // setState常用法(二)：
    // 当要修改的值依赖于之前的state时，应该用函数的写法, 
     //写法一
     this.setState((prevState, prePprops) => {
      return {
        count: prevState.count + 1
      }
    }, () => {
      console.log("组件开始重新渲染之前 count的值：" + this.state.count);
    })

    // 箭头函数后如果返回对象可以用()包裹,写法二：
    this.setState((prevState, props) => ({
      count: prevState.count + 1
    }), () => {
      console.log("组件开始重新渲染之前 count的值：" + this.state.count);
    })
   
    console.log(this.state.count);
  }


  // 组件将要卸载前
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  formatName(user) {
    return user.firstName + ' ' + user.lastName;
  }

  render() {
    //定义变量
    const title = "Hello World";
    const jsx = <p>jsx也是表达式</p>
    return (
      <div>
        {/* 属性 */}
        <img src={logo} className="logo" alt="logo"></img>
        {/* 表达式 */}
        <h2>{title}</h2>
        <p>Welcome {this.formatName({ firstName: 'Li', lastName: 'Haijing' })}</p>
        {/* jsx也是表达式 */}
        {jsx}
        {/* 函数组件属性传值:属性的值时只读的，不能改变，严格遵循单向数据流*/}
        <Welcome name="Haijing"></Welcome>
        {/* 使用状态 */}
        <p>{this.state.date.toLocaleTimeString()}</p>

        <Button type="primary">Primary</Button>
      </div>
    )
  }
}
