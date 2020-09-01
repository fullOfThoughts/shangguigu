import React from 'react'
import { connect } from 'react-redux'
import { Modal, Form, Input, Button } from 'antd'
import { openModal } from '../../actions'

@connect((state) => ({ modalState: state.Modal }), { openModal })
class ModifyCategory extends React.Component {
  subRef = React.createRef()
  formRef = React.createRef()

  state = {
    confirmLoading: false,
  }

  handleOk = () => {
    this.subRef.current.click()
  }

  handleCancel = () => {
    this.props.openModal(this.props.modalState.record)
    this.formRef.current.resetFields()
  }
  onFinish = () => {
    this.setState({ confirmLoading: true }, () => {
      this.props.getCategoryList(0).then(() => {
        this.setState({ confirmLoading: false }, () => {
          this.formRef.current.resetFields()
          this.props.openModal(this.props.modalState.record)
        })
      })
    })
  }
  render() {
    return (
      <Modal
        title="更新分类"
        maskStyle={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
        visible={this.props.modalState.open}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        confirmLoading={this.state.confirmLoading}
      >
        <Form onFinish={this.onFinish} size="large" ref={this.formRef}>
          <Form.Item
            name="categoryName"
            rules={[{ required: true, message: '分类名称不能为空' }]}
          >
            <Input placeholder={this.props.modalState.record.name} />
          </Form.Item>

          <Form.Item hidden>
            <Button ref={this.subRef} htmlType="submit"></Button>
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}
export default ModifyCategory
