import React, { Component,useState,useEffect } from 'react'
import {
View,
Button,
Image
} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {user_icon} from '@/assets/model'
import style from './index.module.less'
export default ()=>{
   const [login,setLogin] = useState<boolean>(false)
   const userLogin = ()=>{
      Taro.navigateTo({url:'/pages/user-login/index'})
      
   }
   return (<View className={style.box} >
      <View className={style.message_box}>
             <Image src={user_icon} className={style.message_user_icon} /> 
             <View className={style.message_title_box}>
                 <View className={style.message_title}>未登录</View>
                 <View className={style.message_text}>登录后可使用</View>
               </View> 
               {
                  login?<View className={style.go_endit} onClick={()=>Taro.navigateTo({url:'/pages/person-set/index'})}>设置&gt;</View>:''
               }  
         </View>
      {
         login?(''):(<View className={style.btn_box}>
            <Button className={style.btn} onClick={()=>userLogin()}>立即登录</Button>
         </View>)
      }
   </View>)
  }