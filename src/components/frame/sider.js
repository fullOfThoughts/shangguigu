import React from 'react'
import { Layout, Menu } from 'antd'
import { withRouter } from 'react-router-dom'
import MenuList from './MenuList'
import SiderLogo from './sider.png'

const { Sider } = Layout
const { SubMenu } = Menu

@withRouter
class SiderLeft extends React.Component {
  state = {
    subMenu: null,
  }

  goHome = () => {
    this.props.history.push('/')
  }

  openSubMenu = () => {
    const pathArr = this.props.location.pathname.split('/')
    pathArr.length = 3
    MenuList.forEach((item) => {
      if (item.children) {
        item.children.forEach((itemList) => {
          if (itemList.key === pathArr.join('/')) {
            this.setState({ subMenu: item.key })
          }
        })
      }
    })
  }

  componentWillMount() {
    const pathArr = this.props.location.pathname.split('/')
    pathArr.length = 3
    this.props.getTitle(MenuList, pathArr.join('/'))
    this.openSubMenu()
  }

  Switch = ({ key }) => {
    this.props.history.push(key)
    const pathArr = key.split('/')
    pathArr.length = 3
    this.props.getTitle(MenuList, pathArr.join('/'))
  }

  createMenuList = (data) => {
    return data.map((item) => {
      return item.children ? (
        <SubMenu key={item.key} icon={<item.icon />} title={item.title}>
          {this.createMenuList(item.children)}
        </SubMenu>
      ) : (
        <Menu.Item key={item.key} icon={<item.icon />}>
          {item.title}
        </Menu.Item>
      )
    })
  }

  render() {
    const pathArr = this.props.location.pathname.split('/')
    pathArr.length = 3

    return (
      <Sider className="sider-left">
        <img
          src={SiderLogo}
          alt="12"
          style={{ cursor: 'pointer' }}
          onClick={this.goHome}
        />
        <Menu
          theme="dark"
          defaultOpenKeys={[this.state.subMenu]}
          selectedKeys={[pathArr.join('/')]}
          mode="inline"
          onClick={this.Switch}
        >
          {this.createMenuList(MenuList)}
        </Menu>
      </Sider>
    )
  }
}
export default SiderLeft
