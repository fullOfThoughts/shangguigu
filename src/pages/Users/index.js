import React from 'react'
import { getManage } from '../../ajax'
import moment from 'moment'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { PageHeader, Button, Table, Modal, Form, Input, Select } from 'antd'

const { Option } = Select
const { confirm } = Modal

export default class Users extends React.PureComponent {
  formRef = React.createRef()
  subRef = React.createRef()
  state = {
    data: [],
    columns: [],
    visible: false,
    isLoading: false,
    initialValues: {},
  }
  //  创建列
  createColumns = () => {
    const columns = [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: '邮箱',
        dataIndex: 'emil',
        key: 'enil',
      },
      {
        title: '电话',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
      },
      {
        title: '注册时间',
        key: 'createAt',
        render: (record) => {
          return moment(record.createAt).format('YYYY-MM-DD kk:mm:ss')
        },
      },
      {
        title: '所属角色',
        key: 'role',
        render: (record) => {
          if (record.role === 1) {
            return '经理'
          } else if (record.role === 2) {
            return 'admin'
          } else {
            return '游客'
          }
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (record) => {
          return (
            <>
              <Button type="link" onClick={() => this.showModal(record)}>
                修改
              </Button>
              <Button type="link" onClick={() => this.delete(record)}>
                删除
              </Button>
            </>
          )
        },
      },
    ]
    this.setState({ columns })
  }
  //  删除模态框
  delete = (record) => {
    confirm({
      title: `确定删除${record.username}吗?`,
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let arr = [...this.state.data]
            let index = arr.findIndex((item) => item.id === record.id)
            arr.splice(index, 1)
            this.setState({ data: arr })
            resolve('ok')
          }, 500)
        })
      },
      onCancel() {},
    })
  }

  handleOk = () => {
    this.subRef.current.click()
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
  }

  showModal = (data) => {
    this.timer = setInterval(() => {
      if (this.formRef.current.resetFields) {
        this.formRef.current.resetFields()
        clearInterval(this.timer)
      }
    })

    if (data) {
      this.setState((state) => ({ visible: true }))
      this.setState((state) => ({ initialValues: data }))
    } else {
      this.setState((state) => ({ initialValues: {} }))
      this.setState((state) => ({ visible: true }))
    }
  }

  onFinish = (values) => {
    console.log(values)
    this.setState({ isLoading: true })
    setTimeout(() => {
      const arr = [...this.state.data]
      values.id = 123132131 * Math.random()
      arr.unshift(values)

      this.setState((state) => ({ isLoading: false }))
      this.setState((state) => ({ visible: false }))
      this.setState((state) => ({ data: arr }))
    }, 500)
  }

  componentDidMount() {
    getManage().then((value) => {
      this.setState({ data: value.data })
    })
    this.createColumns()
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <PageHeader
          title={
            <>
              <Button type="primary" onClick={() => this.showModal(null)}>
                创建用户
              </Button>
              <Modal
                title={this.state.initialValues ? '修改信息' : '添加用户'}
                confirmLoading={this.state.isLoading}
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Form
                  size="large"
                  ref={this.formRef}
                  onFinish={this.onFinish}
                  requiredMark={false}
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 13 }}
                  initialValues={{ ...this.state.initialValues }}
                >
                  <Form.Item
                    label="用户名"
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: '请输入用户名!',
                      },
                    ]}
                  >
                    <Input placeholder="请输入用户名" />
                  </Form.Item>
                  <Form.Item
                    hidden={this.state.initialValues ? true : false}
                    label="密码"
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: '请输入密码!',
                      },
                    ]}
                  >
                    <Input.Password placeholder="请输入密码" />
                  </Form.Item>
                  <Form.Item
                    label="手机号"
                    name="phoneNumber"
                    rules={[
                      {
                        required: true,
                        message: '请输入手机号!',
                      },
                    ]}
                  >
                    <Input placeholder="请输入手机号" />
                  </Form.Item>
                  <Form.Item
                    label="邮箱"
                    name="emil"
                    rules={[
                      {
                        required: true,
                        message: '请输入邮箱!',
                      },
                    ]}
                  >
                    <Input placeholder="请输入邮箱" />
                  </Form.Item>
                  <Form.Item
                    label="角色"
                    name="role"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                    ]}
                  >
                    <Select placeholder="请选择角色" allowClear>
                      <Option value={1}>经理</Option>
                      <Option value={2}>admin</Option>
                      <Option value={3}>游客</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item hidden>
                    <Button ref={this.subRef} htmlType="submit"></Button>
                  </Form.Item>
                </Form>
              </Modal>
            </>
          }
          style={{ borderBottom: '2px solid rgba(0,0,0,0.1)', width: '100%' }}
        />
        <Table
          rowKey="id"
          dataSource={this.state.data}
          bordered
          style={{ width: '97%', marginTop: '10px' }}
          columns={this.state.columns}
          pagination={{ hideOnSinglePage: true }}
        />
      </div>
    )
  }
}
