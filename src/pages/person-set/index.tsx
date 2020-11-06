import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import {
View,
Button,
Input
} from '@tarojs/components'
import style from './index.module.less'
import PopUp from '@/components/Pop-ups/text'
export default ()=>{
      const [name,setName] = useState<string>('')
      const [time,setTime] = useState<string>('')
      const [time_n,setTimeN] = useState<string>('')
      const [address,setAddress] = useState<string>('')
      const [pop_show,setPopShow] = useState<boolean>(false)
   const handleSend = ()=>{
       
      Taro.reLaunch({url:'/pages/tabPage/order/index?isFrist=true'})
   }
   return (<View className={style.username_box} >
         <PopUp show={pop_show} setShow={setPopShow} title={'邀请码不存在,请重新输入'} />
         <View style={{padding:'0 15px',boxSizing:'border-box',width:'100%',backgroundColor:'#fff'}}>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>头像</View>
            <Input className={style.name_item_text} value={name} />
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>账号昵称</View>
            <Input className={style.name_item_text} value={name} />
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>绑定手机号</View>
            <Input className={style.name_item_text} value={name} />
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>阳历生日</View>
            <Input className={style.name_item_text} value={time} />
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>阴历生日</View>
            <Input className={style.name_item_text} value={time_n} />
         </View>
         <View className={style.name_ipt_item} style={{border:'none'}}>
            <View className={style.name_item_lebal}>籍贯</View>
            <Input className={style.name_item_text} value={address} />
         </View>
         </View>
         <View className={style.btn_box} style={{marginTop:'30px'}}>
            <Button className={style.btn}>退出登录</Button>
         </View>
   </View>)
  }