export default {
  pages: [
    'pages/tabPage/order/search',
    'pages/tabPage/order/index',
    'pages/user-login/index',
    'pages/user-login/user_name',
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
        // iconPath: './image/ic_me_normal.png',
        // selectedIconPath: './image/ic_me_selected.png'
      },
      {
        pagePath: 'pages/tabPage/myhome/index',
        // iconPath: './image/ic_me_normal.png',
        // selectedIconPath: './image/ic_me_selected.png'
      }]
  }
}
