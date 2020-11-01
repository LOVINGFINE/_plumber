export default {
  pages: [
    'pages/tabPage/order/index',
    'pages/tabPage/myhome/index',
    'pages/tabPage/commission/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '水电工小程序',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    custom: true,
    color: 'rgba(68, 68, 68, 1)',
    selectedColor: 'rgba(68, 68, 68, 1)',
    backgroundColor: 'white',
    list: [
      {
        pagePath: 'pages/tabPage/order/index'
      },
      {
        pagePath: 'pages/tabPage/commission/index',
        text: '我的佣金',
        // iconPath: './image/ic_me_normal.png',
        // selectedIconPath: './image/ic_me_selected.png'
      },
      {
        pagePath: 'pages/tabPage/myhome/index',
        text: '我的',
        // iconPath: './image/ic_me_normal.png',
        // selectedIconPath: './image/ic_me_selected.png'
      }]
  }
}
