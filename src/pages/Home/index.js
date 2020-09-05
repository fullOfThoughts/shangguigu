import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography
export default class Home extends React.Component {
  state = {}
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <Title>满脑的思绪呀</Title>
      </div>
    )
  }
}
