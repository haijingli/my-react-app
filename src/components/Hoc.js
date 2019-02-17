import React, { Component } from 'react'

// title的内容由高阶组件传入，展示组件只包含contents
// function ShowDetail(props) {
//     return (
//         <div>
//             <h1>{props.title}</h1>
//             <p>{props.contents}</p>
//         </div>
//     )
// }

// 高阶组件实际是一个函数，传入一个组件，经过处理，返回处理后的组件
// 可以对属性进行包装，还可以重写组件的生命周期
// 1.对属性进行包装 此例子中返回函数组件的写法
// const withName = (component) =>{
//     const myTitle = "我的博客";
//     return (props) =><ShowDetail {...props} title={myTitle}/>
// }

// 2.重写组件生命周期，返回class组件的写法
const withName = (Comp) => {
    class GetTitle extends Component {
        constructor(props) {
            super(props)

            this.state = {
                myTitle: ''
            }
        }

        componentDidMount() {
            console.log(Comp.name + "已挂载");

            this.setState({ myTitle: '我的博客' })
        }
        render() {
            return <Comp {...this.props} title={this.state.myTitle} />
        }
    }
    return GetTitle;
}

const withLog = Comp => {
    console.log(Comp.name + '渲染了');
    return (props) => <Comp {...props} />

}

// 装饰器只能用于class
@withLog
@withName
@withLog
class ShowDetail extends Component {
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.props.contents}</p>
            </div>
        )
    }
}

// export default withLog(withName(ShowDetail));
export default ShowDetail;
