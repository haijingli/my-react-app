import React, { Component } from 'react'
import { BrowserRouter, Link, Route, Switch, Redirect } from 'react-router-dom'
import { connect, Provider } from 'react-redux';
import { login } from '../store/user.redux'
import store from '../store'

function App() {
    return (
        <div>
            <ul>
                {/* 导航链接 */}
                <li>
                    <Link to="/">home</Link>
                </li>
                <li>
                    <Link to="/about">about</Link>
                </li>
                <li>
                    <Link to="/foo">foo</Link>
                </li>
            </ul>
            {/* Switch包含的路由只能执行一个，此时Route中可以不使用exact */}
            <Switch>
                {/* 路由配置 Route默认是包含匹配，例如地址栏导航到/about时 home也会显示
                ，因为/about包含/ 可以使用exact精确匹配*/}
                <Route exact path="/" component={Home} />
                {/* <Route path="/about" component={About} /> */}
                <PrivateRoute path="/about" component={About} />
                {/* 路由参数 :后跟参数名 :course  :id */}
                <Route path="/detail/:course" component={Detail} />
                <Route path="/login" component={Login} />
                {/* 用于匹配没有匹配上路由的链接，默认路由，
                问题是其他匹配上的路由也会进行保护匹配，解决方法是使用<Switch>对路由进行封装 */}
                <Route component={NoMatch} />
            </Switch>
        </div>
    )
}

// 路由守卫，从props中解构出component并重命名（自定义组件需要大写）
// function PrivateRoute({ component: Component, ...rest }) {
//     return (
//         // Route 组件中的render函数可以根据条件去渲染组件，component函数指定渲染组件
//         <Route {...rest}
//             render={(props) =>
//                 auth.isLogin ?
//                     (<Component {...props} />) :
//                     (<Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />)
//             }
//         />
//     );
// }

// const auth = {
//     isLogin: false,
//     login(cb) {
//         this.isLogin = true;
//         setTimeout(cb, 200);
//     }
// }

@connect(
    state => ({ isLogin: state.user.isLogin }),
    { login }
)
class PrivateRoute extends Component {
    render() {
        const { isLogin, component: Component, ...rest } = this.props;
        return (
            // Route 组件中的render函数可以根据条件去渲染组件，component函数指定渲染组件
            <Route {...rest}
                render={(props) =>
                    isLogin ?
                        (<Component {...props} />) :
                        (<Redirect to={{ pathname: '/login', state: { from: props.location.pathname } }} />)
                }
            />
        );
    }
}

@connect(
    state => ({ isLogin: state.user.isLogin }),
    { login }
)
class Login extends Component {
    // state = { isLogin: false }

    // login = () => {
    //     auth.login(() => {
    //         this.setState({ isLogin: true })
    //     })
    // }

    render() {
        const from = this.props.location.state.from || "/";;
        if (this.props.isLogin) {
            return <Redirect to={from} />
        } 
        return (
            <div>
                <p>请先登录</p>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
        
    }

}

function NoMatch() {
    return <div>404</div>
}

/**
 * 系统首页
 * 对传入的props进行解构
 * @param {location} 定位
 */
function Home({ location }) {
    console.log(location.state);
    return (
        <div>
            <ul>
                <li>
                    <Link to="/detail/JavaScript">JavaScript</Link>
                </li>
                <li>
                    <Link to="/detail/Java">Java</Link>
                </li>
                <li>
                    <Link to="/detail/Python">Python</Link>
                </li>

            </ul>
        </div>
    )
}

function About() {
    return (
        <div>
            <h2>用户中心</h2>
            <div>
                <Link to="/about/me">个人信息</Link>|
                <Link to="/about/order">我的订单</Link>
            </div>
            <Switch>
                <Route path="/about/me" component={() => (<div>我的信息</div>)}></Route>
                <Route path="/about/order" component={() => (<div>个人订单</div>)}></Route>
                {/* 路由重定向，默认匹配 */}
                <Redirect to="/about/me"></Redirect>
            </Switch>
        </div>
    )
}


/**
 * 展示详情
 * 对传入的props进行解构
 * @param {match} 参数获取等路由信息
 * @param {history} 导航
 * @param {location} 定位
 */
function Detail({ match, history, location }) {
    console.log(match, history, location);
    return (
        <div>
            <button onClick={history.goBack}>{`<<`}</button>
            {/*通过match的parms获取参数  */}
            {match.params.course}
            {/* state是可选参 */}
            <button onClick={() => history.push({ pathname: '/', state: { foo: 'bar' } })}>首页</button>
        </div>
    )
}

export default class RouteSample extends Component {
    render() {
        return (
            <div>
                <BrowserRouter>
                    <Provider store={store}>
                        <App></App>
                    </Provider>
                </BrowserRouter>
            </div>
        )
    }
}
