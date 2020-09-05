import React from 'react'
import { Modal, Tree, Input, Form } from 'antd'
import { connect } from 'react-redux'
import { treevisible } from '../../actions'
import menuList from '../../components/frame/MenuList'

@connect((state) => ({ tree: state.tree }), { treevisible })
class TreeSelect extends React.Component {
  lala = React.createRef()
  state = {
    count: 0,
    count2: 0,
    data: [],
    expandedKeys: [],
    checkedKeys: ['/admin/category', '/admin/bar', '/admin/pie'],
    selectedKeys: [],
  }

  handleOk = () => {
    this.props.treevisible()
  }

  handleCancel = () => {
    this.props.treevisible()
    this.onCheck(['/admin/category', '/admin/bar', '/admin/pie'])
  }

  onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys)
    this.setState({ expandedKeys })
  }

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys)
    this.setState({ checkedKeys })
  }

  onSelect = (selectedKeys, info) => {
    console.log('onSelect', info)
    this.setState({ selectedKeys })
  }

  componentDidMount() {}

  render() {
    return (
      <Modal
        title="设置角色权限"
        visible={this.props.tree.visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
      >
        <Form.Item
          label="角色名称"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 15 }}
        >
          <Input value={this.props.record.name} ref={this.lala} />
        </Form.Item>
        <Tree
          checkable
          defaultExpandAll
          onExpand={this.onExpand}
          autoExpandParent={true}
          onCheck={this.onCheck}
          checkedKeys={this.state.checkedKeys}
          onSelect={this.onSelect}
          selectedKeys={this.state.selectedKeys}
          treeData={menuList}
        />
      </Modal>
    )
  }
}
export default TreeSelect
