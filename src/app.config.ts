export default {
  pages: [
    'pages/tabPage/order/detail',
    'pages/user-login-code/user_name',
    'pages/first/index',
    'pages/person-set/index',
    
    'pages/person-set/phone',
    'pages/person-set/name',
    'pages/product/mapView',
    'pages/tabPage/order/search',
    'pages/user-login/index',
    'pages/user-login-code/index',
    'pages/product/index',
    'pages/codeInfo/codeSuccess',
    'pages/codeInfo/codeError',
  ],
  permission: {
    'scope.userLocation':{
      desc: "你的位置信息将用于小程序位置选择" 
    }
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '水电工小程序',
    navigationBarTextStyle: 'black'
  }
}
