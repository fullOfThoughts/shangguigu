import React from 'react'
import {
  PageHeader,
  Form,
  Input,
  Button,
  Select,
  Upload,
  Modal,
  Cascader,
  message,
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './index.less'
import { withRouter } from 'react-router-dom'
import { getProductCategory } from '../../../ajax'

const { Option } = Select

const E = require('wangeditor')

@withRouter
class ProductAdd extends React.Component {
  formRef = React.createRef()
  state = {
    Options: '',
    loading: false,
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: [],
    oneCategory: [],
  }

  getOptions = () => {
    const Options = (
      <Form.Item name="priceOption" noStyle>
        <Select className="select-after">
          <Option value="RMB">RMB</Option>
          <Option value="$">$</Option>
          <Option value="€">€</Option>
        </Select>
      </Form.Item>
    )
    this.setState({ Options })
  }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  handleChange = ({ file, fileList }) => {
    this.setState({ fileList })
    if (file.status === 'done') {
      message.success('上传成功')
    }
    if (file.status === 'removed') {
      message.success('删除成功')
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await this.getBase64(file.originFileObj)
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    })
  }

  uploadButton = () => {
    return (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>上传</div>
      </div>
    )
  }

  onFinish = (values) => {
    values.productPicture = values.productPicture.fileList.map(
      (item) => item.name
    )
    console.log(values)
  }

  category = () => {
    const category = [
      {
        value: 'computer',
        label: '电脑',
        isLeaf: false,
      },
      {
        value: 'phone',
        label: '手机',
        isLeaf: false,
      },
    ]
    this.setState({ category })
  }

  loadData = (selectedOptions) => {
    const targetOption = selectedOptions[0]
    targetOption.loading = true
    this.getProductCategory(1).then((value) => {
      targetOption.children = [...value]
      targetOption.loading = false
      this.setState({ oneCategory: [...this.state.oneCategory] })
    })
  }

  componentWillMount() {
    this.getOptions()
    this.category()
  }

  getProductCategory = (count) => {
    return getProductCategory().then((value) => {
      const arr = []
      value.data.forEach((item) => {
        if (item.status === count) {
          arr.push(item)
        }
      })

      if (count === 0) {
        const newArr = arr.map((item) => {
          return Object.assign({}, item, { isLeaf: false })
        })
        this.setState({ oneCategory: newArr })
      }
      return arr
    })
  }

  beforeUnLoad = () => {
    return (e) => {
      e.preventDefault()
      return (e.returnValue = false)
    }
  }

  componentDidMount() {
    //  创建富文本编辑器
    const editor = new E('#editor')
    editor.customConfig.onchange = (html) => {
      this.formRef.current.setFieldsValue({
        productDetail: html,
      })
    }
    editor.create()
    editor.txt.html(
      this.props.location.state ? this.props.location.state.detail : null
    )
    this.formRef.current.setFieldsValue({
      productDetail: this.props.location.state
        ? this.props.location.state.detail
        : null,
    })
    //  获取分类的ajax
    this.getProductCategory(0)
    //  为详情添加初始图片
    if (this.props.location.state) {
      return this.setState({
        fileList: [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: this.props.location.state.img1,
          },
          {
            uid: '-2',
            name: 'image.png',
            status: 'done',
            url: this.props.location.state.img2,
          },
        ],
      })
    }
  }

  componentWillUnmount() {
    //  清除ajax
    window._clearRequest()
  }

  render() {
    return (
      <div className="add-product">
        <PageHeader
          className="site-page-header"
          onBack={() => {
            if (window.confirm('返回不会保存内容')) {
              this.props.history.push('/admin/product')
            }
          }}
          title={this.props.location.state ? '修改商品' : '添加商品'}
        />

        <Form
          ref={this.formRef}
          size="large"
          onFinish={this.onFinish}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 8 }}
          initialValues={{
            priceOption: 'RMB',
            productName: this.props.location.state
              ? this.props.location.state.name
              : null,
            productTitle: this.props.location.state
              ? this.props.location.state.title
              : null,
            productPrice: this.props.location.state
              ? this.props.location.state.price
              : null,
          }}
        >
          <Form.Item
            label="商品名称"
            name="productName"
            rules={[{ required: true, message: '请输入商品名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="商品描述"
            name="productTitle"
            rules={[{ required: true, message: '请输入商品描述!' }]}
          >
            <Input.TextArea autoSize={{ minRows: 2 }} />
          </Form.Item>
          <Form.Item
            label="商品价格"
            name="productPrice"
            rules={[
              { required: true, message: '请输入商品价格!' },
              {
                pattern: /^[1-9][0-9]{0,}$/,
                message: '只能为大于零的数字',
              },
            ]}
          >
            <Input addonAfter={this.state.Options} />
          </Form.Item>

          <Form.Item
            name="productCategory"
            label="商品分类"
            rules={[
              {
                type: 'array',
                required: true,
                message: 'Please select your habitual residence!',
              },
            ]}
          >
            <Cascader
              options={this.state.oneCategory}
              loadData={this.loadData}
            />
          </Form.Item>

          <Form.Item label="商品图片" name="productPicture">
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture-card"
              fileList={this.state.fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
            >
              {this.uploadButton()}
            </Upload>
          </Form.Item>
          <Modal
            visible={this.state.previewVisible}
            title={this.state.previewTitle}
            footer={null}
            onCancel={this.handleCancel}
          >
            <img
              alt="example"
              style={{ width: '100%' }}
              src={this.state.previewImage}
            />
          </Modal>

          <Form.Item className="editor" label="商品详情" name="productDetail">
            <div
              style={{
                width: '222%',
                height: 350,
              }}
              ref={this.editorRef}
              id="editor"
            ></div>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
export default ProductAdd
