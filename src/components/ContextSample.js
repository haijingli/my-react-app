import React, { Component } from 'react';

const Context = React.createContext();

const store = {
    name: 'React',
    sayHi() {
        console.log(this.name);
    }
}

//非装饰器写法，不能复用
// export default class ContextSample extends Component {
//     render() {
//         return (
//             <Context.Provider value={store}>
//                 <div>
//                     <Context.Consumer>
//                         {value => <h1 onClick={() => value.sayHi()}>{value.name}</h1>}
//                     </Context.Consumer>
//                 </div>
//             </Context.Provider>
//         )
//     }
// }

const withProvider = Comp => props => (
    // Provider中提供的属性名必须是value
    <Context.Provider value={store}>
        <Comp {...props}></Comp>
    </Context.Provider>
)

const withConsumer = Comp => props => (
    <Context.Consumer>
        {value => <Comp {...props} value={value}></Comp>}
    </Context.Consumer>
)

@withConsumer
class Inner extends Component {
    render() {
        return <h1 onClick={() => this.props.value.sayHi()}>{this.props.value.name}</h1>
    }
}

@withProvider
class ContextSample extends Component {
    render() {
        return <div><Inner></Inner></div>
    }
}

// 上例中ContextSample提供数据，Inner消费数据
export default ContextSample;