import React from 'react'
import { getProductList } from '../../ajax'
import Highlighter from 'react-highlight-words'
import { SearchOutlined } from '@ant-design/icons'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDetail } from '../../actions'
import './index.less'
import {
  message,
  PageHeader,
  Button,
  Form,
  Input,
  Select,
  Table,
  Tag,
  Space,
} from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

const { Option } = Select

@withRouter
@connect(null, { getDetail })
class Product extends React.Component {
  formRef = React.createRef()
  state = {
    productList: [],
    searchList: [],
    searchText: '',
    searchedColumn: '',
    columns: [],
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            this.searchInput = node
          }}
          placeholder={`搜索关键字`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            this.handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            搜索
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            重置
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100)
      }
    },
    render: (text) =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    })
  }

  handleReset = (clearFilters) => {
    clearFilters()
    this.setState({ searchText: '' })
  }

  modify = (record) => {
    this.props.history.push({
      pathname: '/admin/product/add',
      state: record,
    })
  }

  componentDidMount() {
    getProductList().then(
      (value) => {
        if (value.code === 200) {
          return this.setState({ productList: value.data }, () => {})
        }
        message.error({ content: '获取列表失败', duration: 1 })
      },
      (reason) => {
        message.error({ content: '请求失败', duration: 1 })
      }
    )
  }

  onFinish = (values) => {
    const searchList = []
    const prop = values.name
    const content = values.keyWords
    this.state.productList.forEach((item) => {
      if (item[prop].includes(content)) {
        searchList.push(item)
      }
    })
    if (searchList.length !== 0) {
      this.setState({ searchList })
    } else {
      this.setState({ searchList: [] }, () => {
        message.error({ content: '未找到相关内容', duration: 1 })
        this.formRef.current.resetFields()
      })
    }
  }

  createColumns = () => {
    const columns = [
      {
        title: '商品名称',
        dataIndex: 'name',
        key: 'name',
        width: '10%',
      },
      {
        title: '商品描述',
        dataIndex: 'title',
        key: 'title',
        width: '62%',
        ...this.getColumnSearchProps('title'),
      },
      {
        title: '价格',

        key: 'price',
        render: (text, record, index) => `￥${record.price}`,
        width: '10%',
      },
      {
        title: '状态',
        key: 'onSale',
        render: (text, record, index) => {
          return record.onSale === 0 ? (
            <Tag color="green">在售</Tag>
          ) : (
            <Tag color="warning">售罄</Tag>
          )
        },
        width: '10%',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record, index) => {
          return (
            <div style={{ display: 'flex' }}>
              <Button
                onClick={() => this.modify(record)}
                style={{ color: '#1DA57A' }}
                type="link"
              >
                修改
              </Button>{' '}
              <Button
                onClick={() => this.detail(record)}
                style={{ color: '#1DA57A' }}
                type="link"
              >
                详情
              </Button>
            </div>
          )
        },
        width: '18%',
      },
    ]
    this.setState({ columns })
  }

  detail = (record) => {
    this.props.history.push('/admin/product/detail')
    this.props.getDetail(record)
  }

  addCategory = () => {
    this.props.history.push({
      pathname: '/admin/product/add',
    })
  }

  componentWillMount() {
    this.createColumns()
  }

  render() {
    return (
      <div className="productList">
        <PageHeader
          className="site-page-header"
          style={{
            width: '100%',
            height: 60,
          }}
          title={
            <Form
              ref={this.formRef}
              requiredMark={false}
              style={{ height: 60 }}
              onFinish={this.onFinish}
              layout="inline"
              initialValues={{ name: 'name' }}
            >
              <Form.Item
                style={{ width: 130 }}
                name="name"
                rules={[{ required: true, message: '选一个名称' }]}
              >
                <Select>
                  <Option value="name">按名称搜索</Option>
                  <Option value="title">按内容搜索</Option>
                </Select>
              </Form.Item>

              <Form.Item
                style={{ width: 150 }}
                name="keyWords"
                rules={[{ required: true, message: '关键字' }]}
              >
                <Input placeholder="关键字" />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit">
                  搜索
                </Button>
              </Form.Item>
            </Form>
          }
          extra={
            <Button type="primary" size="large" onClick={this.addCategory}>
              <PlusCircleOutlined />
              添加商品
            </Button>
          }
        />
        <Table
          style={{ width: '97%', marginTop: '25px' }}
          bordered
          rowKey="id"
          dataSource={
            this.state.searchList.length === 0
              ? this.state.productList
              : this.state.searchList
          }
          columns={this.state.columns}
          pagination={{
            size: 'small',
            showQuickJumper: true,
            pageSize: 5,
            hideOnSinglePage: true,
            onChange: this.onChange,
          }}
        />
      </div>
    )
  }
}
export default Product
