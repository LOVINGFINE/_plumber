import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import ChangeIpt from './components/changeIpt'
import {
View,
Input
} from '@tarojs/components'
import style from './index.module.less'
import PopUp from '@/components/Pop-ups/text'
export default ()=>{
      const [old,setOld] = useState<string>('111111121')
      const [newVal,setNewVal] = useState<string>('12121212')
      const [pop_show,setPopShow] = useState<boolean>(false)
      const [code,setCode] = useState<string>('')
      const [info_text,setInfoText] = useState<string>('')
      const [time,setTime] = useState<number>(60)
   const handleSend = ()=>{
       
    Taro.navigateBack({delta:1})
   }
   const handleCodeSend = ()=>{
       setCode('000000')
   }
   return (<View className={style.username_box} >
         <PopUp show={pop_show} setShow={setPopShow} title={info_text} />
         <ChangeIpt  handleOk={handleSend} >
         <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>旧手机号</View>
          <Input className={style.name_item_text} style={{color:'#999',textAlign:'left'}} value={old} onInput={(e)=>setOld(e.detail.value)} />
         </View>
         <View className={style.name_ipt_item}>
          <View className={style.name_item_lebal}>新手机号</View>
          <Input className={style.name_item_text} style={{textAlign:'left'}} value={newVal} onInput={(e)=>setNewVal(e.detail.value)} />
         </View>
         <View className={style.name_ipt_item}>
            <View className={style.name_item_lebal}>验证码</View>
            <Input className={style.name_item_text} style={{textAlign:'left'}} value={code} placeholder='请输入验证码' onInput={(e)=>{(e)=>setCode(e.detail.value)}} />
            {
               time===60?(<View className={style.get_code} onClick={handleCodeSend}>获取验证码</View>):(<View className={style.not_get}>重新获取 {time} s</View>)
            }
         </View>
         </ChangeIpt>
   </View>)
  }