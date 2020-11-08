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
   const [user,setUser] =useState<any>({
      name:'',
      phone:''
   })
   const userLogin = ()=>{
      Taro.navigateTo({url:'/pages/user-login/index'})
      
   }
   useEffect(()=>{
      setLogin(Taro.getStorageSync('login') || false)
      setUser(Taro.getStorageSync('user') || {
         name:'',
         phone:''
      })
   },[])
   return (<View className={style.box} >
      <View className={style.message_box}>
             <Image src={user_icon} className={style.message_user_icon} /> 
             <View className={style.message_title_box}>
             <View className={style.message_title}>{login?user.name:'未登录'}</View>
                 <View className={style.message_text}>{login?user.phone:'登录后可使用'}</View>
               </View> 
               {
                  login?<View className={style.go_endit} onClick={()=>Taro.navigateTo({url:'/pages/person-set/index'})}>设置&gt;</View>:''
               }  
         </View>
      {
         login?(''):(<>
         <View className={style.bottom_q} onClick={()=>Taro.navigateTo({url:'/pages/user-register/index'})}>没有账号?去注册</View>
         <View className={style.btn_box}>
            <Button className={style.btn} onClick={()=>userLogin()}>立即登录</Button>
         </View>
         </>)
      }
   </View>)
  }