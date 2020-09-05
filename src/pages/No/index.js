import React from 'react'
import './index.less'
import MenuList from '../../components/frame/MenuList'
import { connect } from 'react-redux'

@connect((state) => ({ lost: state.lost }))
class No extends React.Component {
  state = {}
  componentDidMount() {
    this.props.lost(MenuList, '/admin/404')
  }
  render() {
    return <div className="lost"></div>
  }
}
export default No
