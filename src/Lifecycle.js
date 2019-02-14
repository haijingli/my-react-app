import React, { Component } from 'react';
import ReactDOM from 'react-dom';


class Lifecycle extends Component {
    constructor(props) {
        super(props)

        console.log('1、组件初始化');

        this.state = {
            msg: props.name,
            isRender: true
        }
    }

    componentWillMount() {
        //此时可以访问属性和状态，可以进行api调用，但还不能操作dom
        console.log('2、组件将要挂载');
    }

    componentDidMount() {
        // 组件已经挂载，可以进行状态更新操作
        console.log('3、组件已经挂载');

        // 以下代码用于测试shouldComponentUpdate()方法在接收到新的state时是否会被调用
        //如果 isRender 的值是 false，则组件不会渲染：
        setTimeout(() => {
            this.setState({
                //isRender: false,
                msg:''
            },()=>{
                const str = this.state.msg;                
                if (!str || 0 === str.length) {
                    ReactDOM.unmountComponentAtNode(document.getElementById("root"));
                    return false;
                } else {
                    return true;
                } 
            })
        }, 5000);
    }

    componentWillReceiveProps(nextProps) {
        //在组件接收到一个新的 prop (更新后)时被调用。这个方法在初始化render时不会被调用。
        this.setState({
            msg:nextProps.name
        })
        console.log(this.state.msg);
        
        console.log('4、组件属性更新了');
    }

    shouldComponentUpdate() {
        // 返回一个布尔值。在组件接收到新的props或者state时被调用。
        console.log('5、组件需要更新吗？');
        return true;
    }

    componentWillUpdate() {
        console.log('6、组件将要更新');

    }

    componentDidUpdate() {
        console.log('7、组件已经更新');
    }

    componentWillUnmount() {
        console.log('8、组件将要卸载');
    }

    render() {
        console.log('render()');
        //组件的 render 方法返回 null 并不会影响该组件生命周期方法的回调。
        //例如，componentWillUpdate 和 componentDidUpdate 依然可以被调用。
        return this.state.isRender ? (
            <div>
                组件生命周期
                <h2>{this.state.msg}</h2>
            </div>
        ) : null
    }
}

export default class extends Component {
    constructor(props) {
        super(props)

        this.state = {
            someValue: 'some value'
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                someValue: 'change value'
            })
        }, 2000);
    }

    render() {
        return <Lifecycle name={this.state.someValue}></Lifecycle>
    }
}
