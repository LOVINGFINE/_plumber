export default {
  pages: [
    'pages/first/index',
    'pages/person-set/index',
    'pages/user-login-code/user_name',
    'pages/person-set/phone',
    'pages/product/mapView',
    
    'pages/product/index',
    
    'pages/tabPage/order/detail',
    
    'pages/person-set/name',
    
    'pages/tabPage/order/search',
    'pages/user-login/index',
    'pages/user-login-code/index',
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
