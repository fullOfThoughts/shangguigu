import React from 'react'
import './index.less'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import Logo from './imgs/logo.png'

export default class Login extends React.Component {
  state = {}
  onFinish = (values) => {
    console.log('Received values of form: ', values)
  }
  render() {
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
                  // validateFirst="false"
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

                <Form.Item>
                  <Button
                    style={{ height: 50, fontSize: '25px' }}
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </section>
      </div>
    )
  }
}
