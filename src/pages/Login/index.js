import React from 'react'
import './index.less'
import { Reqlogin } from '../../ajax'
import { Redirect } from 'react-router-dom'
import { firstLogin } from '../../actions'
import { connect } from 'react-redux'
import { Form, Input, Button, Spin, message, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Logo from './imgs/logo.png'

@connect((state) => ({ user: state.user }), { firstLogin })
class Login extends React.Component {
  state = {
    flag: false,
  }
  onFinish = (values) => {
    this.setState({ flag: true })
    Reqlogin(values.username, values.password).then(
      (res) => {
        if (res.data.password === values.password) {
          this.setState({ flag: false }, () => {
            message.success({ content: '登录成功', duration: 1 })
            this.props.history.replace('/')
            values.remember
              ? window.localStorage.setItem('user', JSON.stringify(res.data))
              : window.sessionStorage.setItem('user', JSON.stringify(res.data))
            this.props.firstLogin()
          })
        } else {
          this.setState({ flag: false }, () => {
            message.error({ content: '密码或账号错误', duration: 1 })
          })
        }
      },
      (reason) => {
        console.log(reason)
        this.setState({ flag: false })
        message.error({ content: '请求出错', duration: 1 })
      }
    )
  }
  render() {
    if (this.props.user.id) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-back">
        <header className="login-header">
          <img src={Logo} alt="12" />
          <h1>Admin</h1>
        </header>
        <section className="login-content">
          <div className="login-content-div">
            <h1>用户登录</h1>
            <div>
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ remember: true }}
                onFinish={this.onFinish}
              >
                <Form.Item
                  initialValue="admin"
                  hasFeedback
                  name="username"
                  rules={[{ required: true, message: '请输入用户名!' }]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="用户名"
                  />
                </Form.Item>
                <Form.Item
                  hasFeedback
                  style={{ paddingBottom: '14px' }}
                  name="password"
                  validateFirst="false"
                  rules={[
                    { required: true, message: '请输入密码!' },
                    { min: 4, message: '密码不能少于4位' },
                    { max: 12, message: '不能大于十二位' },
                    {
                      pattern: /^\w{0,12}$/,
                      message: '只能输入英文、数字、下划线',
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="密码"
                  />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Form.Item>
                  <Spin spinning={this.state.flag}>
                    <Button
                      style={{ height: 50, fontSize: '25px' }}
                      type="primary"
                      htmlType="submit"
                      className="login-form-button"
                    >
                      登录
                    </Button>
                  </Spin>
                </Form.Item>
              </Form>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
export default Login
