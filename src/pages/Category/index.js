import React from 'react'
import {
  PageHeader,
  Button,
  Table,
  message,
  Modal,
  Form,
  Input,
  Select,
} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'
import { getCategory } from '../../ajax'
import './index.less'
import { connect } from 'react-redux'
import { openModal } from '../../actions'
import ModifyCategory from './ModifyCategory'

const { Option } = Select

@connect(null, { openModal })
class Category extends React.Component {
  subRef = React.createRef()
  formRef = React.createRef()
  state = {
    categoryList: [],
    createColumn: [],
    count: 0,
    name: '',

    visible: false,
    confirmLoading: false,
  }

  handleOk = () => {
    this.subRef.current.click()
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    })
    this.formRef.current.resetFields()
  }

  onFinish = (values) => {
    this.setState({ confirmLoading: true }, () => {
      this.getCategoryList(0).then(() => {
        this.setState({ confirmLoading: false, visible: false }, () =>
          this.formRef.current.resetFields()
        )
      })
    })
  }

  getCategoryList = (count) => {
    return getCategory().then(
      (value) => {
        if (value.code === 200) {
          let categoryList = []
          value.data.forEach((item) => {
            if (item.parentid === count) {
              categoryList.push(item)
            }
          })
          return this.setState({ categoryList })
        }
        message.error({ content: '获取分类失败', duration: 1 })
      },
      (reason) => {
        message.error({ content: '请求失败', duration: 1 })
      }
    )
  }

  createColumn = () => {
    const createColumn = [
      {
        title: '分类名称',
        dataIndex: 'name',
        key: 'name',
        width: '75%',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          return (
            <>
              <Button
                type="link"
                onClick={() => this.ModifyCategory(record)}
                style={{ color: '#1da57a' }}
              >
                修改分类
              </Button>

              {this.state.count === 0 ? (
                <Button
                  onClick={() => this.getIn(record)}
                  type="link"
                  style={{ color: '#1da57a' }}
                >
                  查看子分类
                </Button>
              ) : null}
            </>
          )
        },
        width: '25%',
      },
    ]
    this.setState({ createColumn })
  }

  ModifyCategory = (record) => {
    this.props.openModal(record)
  }

  getIn = (record) => {
    this.getCategoryList(1)
    this.setState({ count: 1, name: record.name })
  }

  addCategory = () => {
    this.setState({ visible: true })
  }

  componentDidMount() {
    this.getCategoryList(this.state.count)
  }

  componentWillMount() {
    this.createColumn()
  }

  render() {
    return (
      <div className="content-content">
        <PageHeader
          className="site-page-header"
          title={
            this.state.count === 0 ? (
              <span style={{ color: '#1da57a' }}>一级分类</span>
            ) : (
              <span style={{ color: '#1da57a' }}>
                二级分类 {this.state.name}
              </span>
            )
          }
          onBack={
            this.state.count === 1
              ? () => {
                  this.setState({ count: 0 })
                  this.getCategoryList(0)
                }
              : null
          }
          extra={
            <>
              <Button type="primary" size="large" onClick={this.addCategory}>
                <PlusCircleOutlined />
                添加
              </Button>
              <Modal
                title="添加分类"
                visible={this.state.visible}
                onOk={this.handleOk}
                confirmLoading={this.state.confirmLoading}
                onCancel={this.handleCancel}
              >
                <Form
                  ref={this.formRef}
                  layout="vertical"
                  size="large"
                  style={{ fontWeight: 'bolder' }}
                  requiredMark={false}
                  onFinish={this.onFinish}
                >
                  <Form.Item
                    label="所属分类："
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: '一级分类',
                      },
                    ]}
                  >
                    <Select placeholder="所属分类" allowClear>
                      <Option value="1">电脑</Option>
                      <Option value="2">手机</Option>
                      <Option value="3">服装</Option>
                      <Option value="4">食品</Option>
                      <Option value="5">饮料</Option>
                      <Option value="6">熟食</Option>
                    </Select>
                  </Form.Item>

                  <Form.Item
                    label="分类名称："
                    name="categoryName"
                    rules={[
                      {
                        required: true,
                        message: '请输入分类名称',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item hidden>
                    <Button ref={this.subRef} htmlType="submit"></Button>
                  </Form.Item>
                </Form>
              </Modal>
            </>
          }
        />
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '16px',
            height: '100%',
          }}
        >
          <Table
            style={{ width: '97%', height: '100%' }}
            dataSource={this.state.categoryList}
            bordered
            columns={this.state.createColumn}
            size="large"
            pagination={{
              position: ['bottomRight'],
              size: 'small',
              showQuickJumper: true,
              pageSize: 5,
            }}
          />{' '}
          <ModifyCategory getCategoryList={this.getCategoryList} />
        </div>
      </div>
    )
  }
}
export default Category
