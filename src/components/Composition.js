import React, { Component } from 'react'

function Dialog(props) {
    return (
        <div style={{ border: `2px solid ${props.color|| 'red'}`}}>
            {/* 相当于vue中匿名插槽 */}
            {props.children}
            {/* 相当于vue中具名插槽 */}
            <div>{props.footer}</div>
        </div>
    )
}

function WelcomDialog(props) {    
    //jsx
    const  button = <button onClick={()=>alert("我是footer")}>确定</button>
    return (
        <div>
            <Dialog color="green" footer={button}>
                <h1>react is very good!</h1>
                <p>I konw</p>
            </Dialog>
        </div>
    )
}
// 组件复合，用复合实现组件的复用而非继承
export default class Composition extends Component {
    render() {
        return (
            <div>
                <WelcomDialog />
            </div>
        )
    }
}
