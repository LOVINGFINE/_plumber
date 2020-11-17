import React,{useState} from 'react'
import Taro from '@tarojs/taro'
import {AtNavBar} from 'taro-ui'
import {
    View
} from '@tarojs/components'
export default (
  {
    title='水电工小程序',
    isBack=false
  }:{isBack?:boolean,title?:string}
)=>{
    const goBack = ()=>{
        Taro.navigateBack({delta:1})
    }
    return <AtNavBar
        onClickLeftIcon={goBack}
        color='#333'
        fixed
        leftIconType={isBack?'chevron-left':''}
  >
      <View style={{fontSize:'15px',color:'#666',fontWeight:700}}>{title}</View>
  </AtNavBar>
}