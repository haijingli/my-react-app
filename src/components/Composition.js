import React, { Component } from 'react'

function Dialog(props) {
    return (
        <div style={{ border: `2px solid ${props.color || 'red'}`,width:300 }}>
            {/* 相当于vue中匿名插槽 */}
            {props.children}
            {/* 相当于vue中具名插槽 */}
            <div>{props.footer}</div>
        </div>
    )
}

function WelcomDialog(props) {
    //jsx
    const button = <button onClick={() => alert("确定要离开我了吗？")}>确定</button>
    return (
        <div>
            <Dialog color="green" footer={button}>
                <h1>我是欢迎对话框!</h1>
            </Dialog>
        </div>
    )
}

function AlertDialog(props) {
    //jsx
    const button = <button onClick={() => alert("我是警告对话框！")}>确定</button>
    return (
        <div>
            <Dialog color="red" footer={button}>
                <h1>我是警告提示框!</h1>
            </Dialog>
        </div>
    )
}

const api = {
    getUser: () => ({ name: 'Tom', age: 18 })
}

//props.children可以是任意合法的js表达式，包括函数。ps：jsx其实也是对js的扩展
function Fetcher(props) {
    let user = api[props.name]();
    return props.children(user);
}

// 对props的children内容进行过滤
function FilterP(props) {
    return (
        <div>
            {/* React.Children提供若干操作嵌套内容的帮助方法 */}
            {React.Children.map(props.children, child => {
                console.log(child);//vdom                
                if (child.type !== 'p') {
                    return;
                }
                return child;
            })}
        </div>
    )
}

function RadioGroup(props) {
    return (
        <div>
            {
                React.Children.map(props.children, child => {
                    return React.cloneElement(child,{name:props.name})
                })
            }
        </div>
    )
}

function Radio({ children, ...rest }) {
    return (
        <label>
            <input type="radio" {...rest} />{children}
        </label>
    )
}
// 组件复合，用复合实现组件的复用而非继承
export default class Composition extends Component {
    render() {
        return (
            <div>
                <WelcomDialog />
                <AlertDialog />
                {/* Fetcher 相当于封装了后台查询请求，传入要调用的方法(getUser)，
                嵌套的内容是个回调函数，该函数接收返回的查询结果并展示 */}
                <Fetcher name="getUser">
                    {({ name, age }) => <p>{name}-{age}</p>}
                </Fetcher>

                {/* 过滤children内容 */}
                <FilterP>
                    <h1>React</h1>
                    <p>React很好用</p>
                    <h1>Vue</h1>
                    <p>Vue也不错</p>
                </FilterP>

                <RadioGroup name="mvvm">
                    <Radio value="Vue">Vue</Radio>
                    <Radio value="React">React</Radio>
                    <Radio value="Angular">Angular</Radio>
                </RadioGroup>
            </div>
        )
    }
}
