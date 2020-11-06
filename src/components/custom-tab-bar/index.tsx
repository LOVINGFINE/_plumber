import React,{useState} from 'react'
import Taro from '@tarojs/taro'
import {AtTabBar} from 'taro-ui'
import * as images from '@/assets/model'
export default ()=>{
    const [current,setCurrent] = useState<number>(0)
    const setNavLink =(e:any)=>{
        setCurrent(e)
        switch(e){
          case 0:
            Taro.switchTab({url:'/pages/tabPage/order/index'})
           break; 
          case 1:
            Taro.switchTab({url:'/pages/tabPage/commission/index'})
          break; 
          case 2:
            Taro.switchTab({url:'/pages/tabPage/myhome/index'})
          break;
          default:
            return  
        }
    }
    return <AtTabBar
    tabList={[
        { title: '订单中心', image: images.order,selectedImage:images.order_select },
        { title: '贡献分管理', image: images.com,selectedImage:images.com_select },
        { title: '我的', image: images.user, selectedImage:images.user_select}
      ]}
    fontSize={11}
    color={'#333'}
    selectedColor={'#003BA5'}
    onClick={(e)=>setNavLink(e)}
    current={current}
    fixed
  />
}