import React from 'react'
import {
  Layout,
  Breadcrumb,
  PageHeader,
  Space,
  message,
  Card,
  Modal,
} from 'antd'
import {
  HomeOutlined,
  UserOutlined,
  HeartTwoTone,
  LogoutOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons'
import { connect } from 'react-redux'
import './index.less'
import './header.less'
import { withRouter } from 'react-router-dom'
import { firstLogin, getLost } from '../../actions'
import SiderLeft from './sider'

const { confirm } = Modal
const moment = require('moment')
const { Header, Footer, Content } = Layout

@withRouter
@connect((state) => ({ user: state.user }), { firstLogin, getLost })
class Frame extends React.Component {
  state = {
    time: Date.now(),
    title: 'Loading',
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({ time: Date.now() })
    }, 1000)
    this.props.getLost(this.getTitle)
  }

  getTitle = (data, key) => {
    data.forEach((item) => {
      if (item.children) {
        return this.getTitle(item.children, key)
      } else {
        if (item.key === key) {
          this.setState({ title: item.title })
        } else if (key === '/admin/404') {
          this.setState({ title: 404 })
        }
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  quit = () => {
    confirm({
      title: '确认退出吗？',
      icon: <ExclamationCircleOutlined />,
      content: '此操作不可逆',
      onOk: () => {
        window.localStorage.removeItem('user')
        window.sessionStorage.removeItem('user')
        this.props.firstLogin()
        message.success({ content: '退出成功', duration: 1 })
      },
      onCancel() {},
      cancelText: '取消',
      okText: '确定',
    })
  }

  render() {
    return (
      <Layout>
        <SiderLeft getTitle={this.getTitle} />

        <Layout>
          <Header className="header-style">
            <PageHeader
              className="site-page-header"
              extra={
                <Space>
                  欢迎
                  <UserOutlined />
                  {this.props.user.username}
                  <LogoutOutlined
                    className="quit"
                    onClick={this.quit}
                    title="退出"
                  />
                </Space>
              }
            />
          </Header>
          <Content className="content-body">
            <Card
              title={this.state.title}
              bordered={false}
              style={{ height: '100%' }}
              extra={
                <Space>
                  {moment(this.state.time).format(`YYYY-MM-DD k:mm:ss`)}
                  <HeartTwoTone twoToneColor="#eb2f96" />晴
                </Space>
              }
            >
              {this.props.children}
            </Card>
          </Content>

          <Footer
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '10px 50px',
            }}
          >
            <Breadcrumb>
              <Breadcrumb.Item href="">
                <HomeOutlined />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <UserOutlined />
                <span>@copyRight</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>满脑的思绪呀</Breadcrumb.Item>
            </Breadcrumb>
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
export default Frame
