import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import {
View,
Button,
Image,
Input
} from '@tarojs/components'
import style from './index.module.less'
import PopUp from '@/components/Pop-ups/text'
export default ({
   setData,
   empty
}:{setData:Function,empty:boolean})=>{
   
      const [text,setText] = useState<string>('')
      const [username,setUsername] = useState<string>('')
      const [password,setPass] = useState<string>('')
      const [pop_show,setPopShow] = useState<boolean>(false)
      useEffect(()=>{
         if(empty){
               setUsername('')
               setPass('')
         }
   },[empty])
   return (<View className={style.message_box} >
          <PopUp show={pop_show} setShow={setPopShow} title={text} />
         <View className={style.item}>
            <View className={style.item_lebal}>账号</View>
            <Input className={style.item_ipt} placeholder="请输入账号"  value={username} onInput={(e)=>{
               setData({
                  username:e.detail.value,
                  password:password
               })
               setUsername(e.detail.value)
            }} />
         </View>
         <View className={style.item}>
            <View className={style.item_lebal}>密码</View>
            <Input className={style.item_ipt} type='text' value={password} placeholder='请输入密码' onInput={(e)=>{
              setData({
               username:username,
               password:e.detail.value
            }) 
               setPass(e.detail.value)
               }} />
            
         </View>
   </View>)
  }