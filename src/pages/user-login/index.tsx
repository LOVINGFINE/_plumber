import React, { Component,useState,useEffect } from 'react'
import {
View,
Button
} from '@tarojs/components'
import style from './index.module.less'
export default ()=>{
   const getUserPhone = (e:any)=>{
        console.log(e);
        // 获取手机号回调
        
   }
   return (<View className={style.box} >
         <Button type="primary" openType="getPhoneNumber" onGetPhoneNumber={(e)=>getUserPhone(e)}>授权登录</Button>
   </View>)
  }
