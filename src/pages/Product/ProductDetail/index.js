import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getDetail } from '../../../actions'
import './index.less'
import { PageHeader, List, Skeleton, Space } from 'antd'

@withRouter
@connect((state) => ({ detail: state.productDetail }), { getDetail })
class ProductDetail extends React.Component {
  img1 = React.createRef()
  img2 = React.createRef()
  state = {
    img1State: false,
    img2State: false,
  }

  isHasData = () => {
    return this.props.detail.name
      ? ''
      : this.props.history.push('/admin/product')
  }
  loadImg = () => {
    this.imgOne = setInterval(() => {
      if (this.img1.current) {
        clearInterval(this.imgOne)
        this.imgOneOne = setInterval(() => {
          if (this.img1.current.complete) {
            clearInterval(this.imgOneOne)
            this.setState({ img1State: true })
          }
        }, 10)
      }
    }, 10)

    this.imgTwo = setInterval(() => {
      if (this.img2.current) {
        clearInterval(this.imgTwo)
        this.imgTwoTwo = setInterval(() => {
          if (this.img2.current.complete) {
            clearInterval(this.imgTwoTwo)
            this.setState({ img2State: true })
          }
        }, 10)
      }
    }, 10)
  }

  onBack = () => {
    this.props.history.push('/admin/product')
    this.props.getDetail({})
  }

  componentDidMount() {
    this.isHasData()
    this.loadImg()
  }
  componentWillUnmount() {
    clearInterval(this.imgOne)
    clearInterval(this.imgOneOne)
    clearInterval(this.imgTwo)
    clearInterval(this.imgTwoTwo)
  }
  render() {
    return (
      <List
        className="detail"
        size="large"
        header={
          <PageHeader
            className="site-page-header"
            onBack={() => this.onBack()}
            title="商品详情"
          />
        }
      >
        <List.Item>
          <h4>商品名称:</h4>
          <span>{this.props.detail.name}</span>
        </List.Item>
        <List.Item>
          <h4>商品描述:</h4>
          <span>{this.props.detail.title}</span>
        </List.Item>
        <List.Item>
          <h4>商品价格:</h4>
          <span>{this.props.detail.price}</span>
        </List.Item>
        <List.Item>
          <h4>所属分类:</h4>
          <span>家用电器</span>
        </List.Item>
        <List.Item>
          <h4 style={{ marginRight: '20px' }}>商品图片:</h4>

          <Space>
            {this.state.img1State ? (
              ''
            ) : (
              <Skeleton.Avatar
                active
                shape={'square'}
                style={{ width: 200, height: 200 }}
              />
            )}
            <img ref={this.img1} src={this.props.detail.img1} alt="12" />
            {this.state.img2State ? (
              ''
            ) : (
              <Skeleton.Avatar
                active
                shape={'square'}
                style={{ width: 200, height: 200 }}
              />
            )}

            <img ref={this.img2} src={this.props.detail.img2} alt="1" />
          </Space>
        </List.Item>
        <List.Item>
          <h4>商品详情:</h4>
          <span>{this.props.detail.detail}</span>
        </List.Item>
      </List>
    )
  }
}
export default ProductDetail
