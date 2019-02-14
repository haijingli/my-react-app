import React, { Component } from 'react'

function Cart(props) {
    return (
        <div>
            <table>
                <tbody>
                    {props.data.map(good => (
                        <tr key={good.id}>
                            <td>{good.text}</td>
                            <td>
                                <button onClick={() => props.subCount(good)}>-</button>
                                {good.count}
                                <button onClick={() => props.addCount(good)}>+</button>
                            </td>
                            <td>￥{good.price * good.count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default class CartSample extends Component {
    constructor(props) {
        super(props)

        this.state = {
            goods: [
                { id: 1, text: 'web全栈架构师1', price: 100 },
                { id: 2, text: 'web全栈架构师2', price: 100 },
            ],
            text: '',
            cart: [],
            history: []//时间旅行
        }

        //写法1：手动绑定事件this
        //this.addGood = this.addGood.bind(this);
    }

    handleChange = (e) => {
        this.setState({
            text: e.target.value
        })
    }

    //写法2：
    addGood = () => {
        this.setState((prevState) => ({
            goods: [...prevState.goods, { id: 3, text: prevState.text, price: 100 }]
        }))

    }

    addGoodToCart(good) {
        // 要保证视图更新，则需要将引用的地址发生变化，因此需要克隆原数组
        const newCart = [...this.state.cart];
        // 查询添加的商品在购物车中是否存在
        const idx = newCart.findIndex(v => v.text === good.text);
        const item = newCart[idx];
        if (item) {
            // 更新对象
            newCart.splice(idx, 1, { ...item, count: item.count + 1 })
        } else {
            //新增商品
            newCart.push({ ...good, count: 1 });
        }
        this.setState({ cart: newCart, history: [...this.state.history, newCart] });
    }

    addCount = (item) => {
        // 每次生成新的数组，可以进行时间旅行
        //如果在原数组上进行修改后加入history中，最后所有的历史记录都是指向相同的地址，无法返回历史
        const newCart = [...this.state.cart];
        // 查询添加的商品在购物车中的索引值
        const idx = newCart.findIndex(v => v.text === item.text);
        newCart.splice(idx, 1, { ...item, count: item.count + 1 });
        this.setState({ cart: newCart, history: [...this.state.history, newCart] });
    }

    subCount = (item) => {
        const newCart = [...this.state.cart];
        const idx = newCart.findIndex(v => v.text === item.text);
        if (item.count > 1) {
            newCart.splice(idx, 1, { ...item, count: item.count - 1 });
        } else {
            newCart.splice(idx, 1);
        }
        this.setState({ cart: newCart, history: [...this.state.history, newCart] })
    }

    go(his){
        this.setState({cart:his});
    } 

    render() {
        const title = this.props.title ? <h1>{this.props.title}</h1> : null;
        const goods = this.state.goods.map(good => (
            <li key={good.id}>{good.text}<button onClick={() => { this.addGoodToCart(good) }}>加购</button></li>
        ));

        return (
            <div>
                {/* 条件语句 */}
                {title}
                <input type="text" value={this.state.text} onChange={this.handleChange} />
                <button onClick={this.addGood}>加购物车</button>
                {/* 列表渲染，数组会自动展开所有成员 */}
                <ul>{goods}</ul>

                {/* 购物车 */}
                {/* 传递函数用于子组件和父组件交互 */}
                <Cart data={this.state.cart} addCount={this.addCount} subCount={this.subCount}></Cart>

                {/* 时间旅行 */}
                {this.state.history.length > 0 ? <h2>时间旅行</h2> : null}
                {this.state.history.map((his, idx) => (
                    <button key={idx} onClick={() => this.go(his)}>history{idx + 1}</button>
                ))}
            </div>
        )
    }
}
