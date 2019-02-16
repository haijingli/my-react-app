import React, { Component, PureComponent } from 'react'

//要判断组件是否需要渲染，则需要用到生命周期，则组件需要用class方式编写
// class Comment extends PureComponent {

// extends Component时需要自己写判断方法，
//    PureComponent重写了shouldComponentUpdate
//     // shouldComponentUpdate(nextProps){
//     //     if (nextProps.data.body ===this.props.data.body&&
//     //         nextProps.data.author === this.props.data.author) {
//     //         return false;
//     //     }
//     //     return true;
//     // }
//     render() {
//         console.log('render');
//         return (
//             <div>
//                 <p>{this.props.body}</p>
//                 <p>----------------{this.props.author}</p>
//             </div>
//         )
//     }
// }

//Reactv16.6.0之后的版本添加了一个新功能React.memo，让函数式组件也具备了PureComponent的功能
const Comment = React.memo(({body,author})=> {
    console.log('render');
    return (
        <div>
            <p>{body}</p>
            <p>----------------{author}</p>
        </div>
    )
});

// <Comment key={idx} data={v}></Comment>此写法引用时，对应的代码，用到了解构
// 从props中解构出data
// function Comment({data}) {
//     console.log('render');

//   return (
//     <div>
//       <p>{data.body}</p>
//       <p>----------------{data.author}</p>
//     </div>
//   )
// }

export default class CommentList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            comments: []
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                comments: [
                    { body: 'my name is lilei', author: 'lilei' },
                    { body: 'my name is hanmeimei', author: 'hanmeimei' }
                ]
            })
        }, 1000);
    }

    render() {
        return (
            <div>
                {this.state.comments.map((v, idx) => (
                    // <Comment key={idx} data={v}></Comment>
                    // <Comment key={idx} body={v.body} author={v.author}></Comment>
                    <Comment key={idx} {...v}></Comment>
                ))}
            </div>
        )
    }
}
