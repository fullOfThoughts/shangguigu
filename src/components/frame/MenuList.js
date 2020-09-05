import {
  HomeOutlined,
  PieChartOutlined,
  AreaChartOutlined,
  AppstoreOutlined,
  AndroidOutlined,
  UnorderedListOutlined,
  SettingOutlined,
  BarChartOutlined,
  LineChartOutlined,
} from '@ant-design/icons'

export default [
  {
    title: '首页',
    key: '/admin/home',
    icon: HomeOutlined,
  },
  {
    title: '商品',
    key: 'sub1',
    icon: AppstoreOutlined,
    children: [
      {
        title: ' 品类管理',
        key: '/admin/category',
        icon: UnorderedListOutlined,
      },
      {
        title: '商品管理',
        key: '/admin/product',
        icon: SettingOutlined,
      },
    ],
  },
  {
    title: '用户管理',
    key: '/admin/user',
    icon: AndroidOutlined,
    isPlubic: true,
  },
  {
    title: '角色管理',
    key: '/admin/roles',
    icon: PieChartOutlined,
  },
  {
    title: ' 图形图表',
    key: 'sub2',
    icon: AreaChartOutlined,
    children: [
      {
        title: ' 柱形图',
        key: '/admin/bar',
        icon: BarChartOutlined,
      },
      {
        title: ' 折线图',
        key: '/admin/line',
        icon: LineChartOutlined,
      },
      {
        title: '饼图',
        key: '/admin/pie',
        icon: PieChartOutlined,
      },
    ],
  },
]
