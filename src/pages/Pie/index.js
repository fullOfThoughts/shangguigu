import React from 'react'
import Charts from './Charts'
import { PageHeader, Button } from 'antd'
const echarts = require('echarts')

export default class Bar extends React.Component {
  charts = React.createRef()
  state = {}
  componentDidMount() {
    const myChart = echarts.init(this.charts.current)
    myChart.setOption({
      ...Charts,
    })
  }
  render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <PageHeader
          title={
            <Button size="large" type="primary">
              更新
            </Button>
          }
          style={{ borderBottom: '2px solid rgba(0,0,0,0.2)' }}
        />
        <PageHeader
          title={<span>饼图一</span>}
          style={{ borderBottom: '2px solid rgba(0,0,0,0.1)' }}
        />
        <div
          style={{
            width: '90%',
            height: 450,
            marginTop: 5,
            alignSelf: 'center',
          }}
          ref={this.charts}
        ></div>
      </div>
    )
  }
}
