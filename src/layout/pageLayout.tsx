import React,{useEffect, useState} from 'react'
import Taro from '@tarojs/taro'
import {AtNavBar} from 'taro-ui'
import {
    View
} from '@tarojs/components'
export default (
  {
    title='水电工小程序',
    isBack=false,
    children
  }:{ 
      children:any
      isBack?:boolean,
      title?:string}
)=>{
  const [nav_height,setHeight] = useState<number>()
  useEffect(()=>{
    let sys = Taro.getSystemInfoSync()
    console.log(sys);
    setHeight(sys.statusBarHeight + 44) 
  },[])
    const goBack = ()=>{
        Taro.navigateBack({delta:1})
    }
    return <View style={{width:'100%'}}>
        <View style={{width:'100%',height:nav_height+'px'}}>
        <AtNavBar onClickLeftIcon={goBack} color='#333' leftIconType={isBack?'chevron-left':''}>
          <View style={{fontSize:'15px',color:'#666',fontWeight:700}}>{title}</View>
        </AtNavBar>
        </View>
    {children}
    </View>
}