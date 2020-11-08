export default {
  pages: [
    'pages/first/index',
    'pages/person-set/index',
    'pages/person-set/phone',
    'pages/person-set/name',
    
    'pages/product/mapView',
    'pages/tabPage/order/search',
    'pages/tabPage/order/detail',
    'pages/user-login/index',
    'pages/user-register/user_name',
    'pages/user-register/index',
    'pages/product/index',
   
    'pages/product/codeError',
    
    
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
