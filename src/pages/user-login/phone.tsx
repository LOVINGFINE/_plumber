import React, { Component,useState,useEffect } from 'react'
import Taro, { setTopBarText } from '@tarojs/taro'
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
      let timer = null
      const [pop_show,setPopShow] = useState<boolean>(false)
      const [text,setText] = useState<string>('')
      const [phone,setPhone] = useState<string>('')
      const [code,setCode] = useState<string>('')
      const [time,setTime] = useState<number>(60)
      useEffect(()=>{
            if(empty){
                  setCode('')
                  setPhone('')
            }
      },[empty])
      const setTimeChange = ()=>{
          timer = setInterval(()=>{
            if(time===1){
                  clearInterval(timer)
                  setTime(60)
            }else {
                  setTime(time-1)
            }
      
        },1000)
      }
      const handleCodeSend = ()=>{
            // 获取验证码
            if(phone!=''){
                if(phone.length===11){
                      if(phone==='11111111111'){
                        setTimeChange()  
                        setData({
                              code:'000000',
                              phone:phone
                        }) 
                        setCode('000000')
                      }else {
                        setText('该手机号未绑定，请使⽤账号 密码登录')
                        setPopShow(true)    
                      }
                }else {
                        setText('请输入正确的手机号')
                        setPopShow(true)    
                  }
            }else {
                  setText('请输入手机号')
                  setPopShow(true)
            }
      }
   return (<View className={style.message_box} >
         <PopUp show={pop_show} setShow={setPopShow} title={text} />
         <View className={style.item}>
            <View className={style.item_lebal}>手机号</View>
            <Input className={style.item_ipt} placeholder="请输入手机号" maxlength={11} value={phone} onInput={(e)=>{
                  setData({
                        phone:e.detail.value,
                        code:code
                  })
                  setPhone(e.detail.value)
            }} />
         </View>
         <View className={style.item}>
            <View className={style.item_lebal}>验证码</View>
            <Input className={style.item_ipt} value={code} placeholder='请输入验证码' onInput={(e)=>{
                  setData({
                        code:e.detail.value,
                        phone:phone
                  })
                  setCode(e.detail.value)}} />
            {
               time===60?(<View className={style.get_code} onClick={handleCodeSend}>获取验证码</View>):(<View className={style.not_get}>重新获取 {time} s</View>)
            }
         </View>
   </View>)
  }