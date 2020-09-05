import React from 'react'
import { PageHeader, Button, Table, message, Modal, Form, Input } from 'antd'
import { getRoles } from '../../ajax'
import { treevisible } from '../../actions'
import { connect } from 'react-redux'
import TreeSelect from './tree'

const moment = require('moment')

@connect(null, { treevisible })
class Roles extends React.Component {
  subRef = React.createRef()
  createRoles = React.createRef()
  state = {
    data: [],
    columns: [],
    selectId: null,
    visible: false,
    confirmLoading: false,
    record: {},
  }

  //  获取roles 列表
  getRoles = () => {
    getRoles().then(
      (value) => this.setState({ data: value.data }),
      (reason) => message('获取roles 失败')
    )
  }
  //  创建列
  createColumns = () => {
    const columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '创建时间',

        key: 'createAt',
        render: (record) => {
          return moment(record.createAt).format('YYYY-MM-DD kk:mm:ss')
        },
      },
      {
        title: '授权时间',
        key: 'accreditAt',
        render: (record) => {
          return moment(record.createAt).format('YYYY-MM-DD kk:mm:ss')
        },
      },
      {
        title: '授权人',
        dataIndex: 'accreditMan',
        key: 'accreditMan',
      },
    ]
    this.setState({ columns })
  }
  //  radio变化
  onChange = (selectedRowKeys, selectedRows) => {
    this.setState({ flag: false, selectId: selectedRows[0].id }, () =>
      this.setState({ record: selectedRows[0] })
    )
  }

  handleOk = (e) => {
    this.subRef.current.click()
  }

  handleCancel = (e) => {
    this.createRoles.current.resetFields()
    this.setState({
      visible: false,
    })
  }

  onFinish = (values) => {
    this.setState({ confirmLoading: true })
    setTimeout(() => {
      message.success('创建成功')
      this.setState({
        visible: false,
        confirmLoading: false,
      })
    }, 500)
    const obj = [...this.state.data]
    const newObj = Object.assign(
      {},
      {
        accreditAt: 1707889327546,
        accreditMan: '蒋艳',
        createAt: 1677696607061,
        id: '350100199705198174',
        name: values.name,
      }
    )

    obj.unshift(newObj)
    console.log(obj)
    this.setState({ data: obj }, () => {
      console.log(this.state.data)
    })
  }

  componentDidMount() {
    this.getRoles()
    this.createColumns()
  }

  render() {
    return (
      <div>
        <PageHeader
          className="site-page-header"
          title={
            <>
              <Button
                style={{ marginRight: 5 }}
                onClick={() => this.setState({ visible: true })}
              >
                创建角色
              </Button>
              <Modal
                confirmLoading={this.state.confirmLoading}
                title="创建角色"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
              >
                <Form
                  ref={this.createRoles}
                  onFinish={this.onFinish}
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 16 }}
                >
                  <Form.Item
                    name="name"
                    label="角色名称"
                    rules={[
                      {
                        required: true,
                        message: '请输入角色名称!',
                      },
                    ]}
                  >
                    <Input placeholder="请输入角色名称" />
                  </Form.Item>
                  <Form.Item hidden>
                    <Button htmlType="submit" ref={this.subRef}></Button>
                  </Form.Item>
                </Form>
              </Modal>
              <Button
                onClick={() => this.props.treevisible()}
                disabled={!this.state.selectId}
              >
                设置角色权限
              </Button>
              <TreeSelect record={this.state.record} />
            </>
          }
        />
        <Table
          rowSelection={{
            type: 'radio',
            onChange: this.onChange,
            selectedRowKeys: [this.state.selectId],
          }}
          rowKey="id"
          bordered
          dataSource={this.state.data}
          columns={this.state.columns}
          pagination={{ hideOnSinglePage: true }}
          onRow={(record) => {
            return {
              onClick: () => {
                this.setState({ selectId: record.id }, () =>
                  this.setState({ record })
                )
              },
            }
          }}
        />
        ;
      </div>
    )
  }
}
export default Roles
