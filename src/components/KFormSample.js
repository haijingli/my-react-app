import React, { Component } from 'react';
import { Icon } from 'antd';

//hoc：对用户的表单进行包装，增加表单的数据管理能力、数据校验功能
function KFormCreate(Comp) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.options = {};
            this.state = {}
        }

        // 处理表单输入事件
        handleChange = (e) => {
            const { name, value } = e.target;
            this.setState({
                [name]: value
            }, () => {
                //表单change时校验
                this.validateField(name);
            })
        }

        // 校验字段项
        validateField = (field) => {
            const rules = this.options[field].rules;
            const ret = rules.some((rule) => {
                // 仅验证必填属性，此处可以调用ansy-validator验证
                if (rule.required) {
                    if (!this.state[field]) {
                        this.setState({
                            [field + 'Message']: rule.message,
                        })
                        // 校验失败返回true
                        return true;
                    }
                }
            });

            if (!ret) {
                //校验通过,清除提示信息
                this.setState({
                    [field + 'Message']: ''
                })
            }
            // 语义转换 校验通过返回true，校验失败返回false
            return !ret;
        }

        //校验所有表单项
        validate = (cb) => {
            const rets = Object.keys(this.options).map(field =>
                this.validateField(field)
            )

            const ret = rets.every(v => v === true);
            cb(ret);
        }

        handleFocus = e => {
            const field = e.target.name;
            this.setState({
                [field + 'Focus']: true
            })
        }
        // 一个！是将对象转为布尔型并取反，两个！是将取反后的布尔值再取反，
        // 相当于将非布尔类型值转为布尔类型值。
        // 此处this.state[field+'Foucus']的值可能为undefined
        isFieldTouched = (field) => !!this.state[field + 'Focus'];

        getFieldError = (field) => this.state[field + 'Message'];


        // 对用户的输入组件进行装饰，扩展输入组件的属性和方法
        getFieldDecorator = (field, option, InputComp) => {
            this.options[field] = option;

            return (
                <div>
                    {React.cloneElement(InputComp, {
                        name: field,
                        value: this.state[field] || '',
                        onChange: this.handleChange,
                        onFocus: this.handleFocus,
                    })}
                    {/* {this.state[field + 'Message'] &&
                        (<p style={{ color: "red" }}>{this.state[field + 'Message']}</p>)
                    } */}
                </div>
            )
        }

        render() {
            return (
                <Comp {...this.props}
                    getFieldDecorator={this.getFieldDecorator}
                    value={this.state}
                    validate={this.validate}
                    isFieldTouched={this.isFieldTouched}
                    getFieldError={this.getFieldError}
                />
            )
        }
    }
}

class FormItem extends Component {
    render() {
        return (
            <div>
                {this.props.children}
                {
                    this.props.validateStatus === 'error' &&
                    (<p style={{ color: "red" }}>{this.props.help}</p>)
                }
            </div>
        )
    }
}

class KInput extends Component {
    render() {
        return (
            <div>
                {this.props.prefix}
                <input {...this.props} type={this.props.type || 'text'} />
            </div>
        )
    }
}

@KFormCreate
class KFormSample extends Component {
    onSubmit = () => {
        this.props.validate(isValid => {
            if (isValid) {
                console.log(this.props.value);
                alert('通过校验，登录成功')
            } else {
                alert('登录失败');
            }
        })

    }
    render() {
        const { getFieldDecorator, isFieldTouched, getFieldError } = this.props;

        const userNameError = isFieldTouched('userName') && getFieldError('userName');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <FormItem validateStatus={userNameError ? 'error' : ''}
                    help={userNameError || ''}>
                    {
                        getFieldDecorator('userName', {
                            rules: [{ required: true, message: '请输入用户名' }]
                        }, <KInput prefix={<Icon type="user"/>} />)
                    }
                </FormItem>

                <FormItem validateStatus={passwordError ? 'error' : ''}
                    help={passwordError || ''}>
                    {
                        getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码' }]
                        }, <KInput type="password" prefix={<Icon type="lock"/>}/>)
                    }
                </FormItem>
                <button onClick={this.onSubmit}>登录</button>
            </div >
        )
    }
}

export default KFormSample;