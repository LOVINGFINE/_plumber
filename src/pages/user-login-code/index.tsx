import React, { Component,useState,useEffect } from 'react'
import Taro from '@tarojs/taro'
import {
View,
Button,
Image,
Input
} from '@tarojs/components'
import CodeIpt from './codeIpt'
import style from './index.module.less'
import PopUp from '@/components/Pop-ups/text'
import {title_img} from '@/assets/model'
import {
      postRegister,// 检查是否注册
      postCodeMessage, // 获取登录信息
   } from '@/models/user'
export default ()=>{
      const [code,setCode] = useState<string>('')
      const [pop_show,setPopShow] = useState<boolean>(false)
      const [pop_text,setText] = useState<string>('')
      const [phone,setPhone] = useState<string>('')
      useEffect(()=>{
           setPhone(Taro.getStorageSync('phone') || '')
      },[])
  
   const onSuccess = ()=>{ 
     if(code.length===6){
        handleSend()
     }else {
      setWarn('请输入完整的邀请码')
     }
         
   }
   const handleSend = ()=>{
         // 验证邀请码
         postCodeMessage(code).then(res=>{
               if(res.code==200){
                  postRegister({phone,id:res.data.id}).then(res=>{
                        let {code,data,message} = res
                        if(code===200&&data.register){
                              check(data.token)  
                        }else {
                              setWarn(message)   
                        }
                  })
               }else {
                  setWarn('邀请码不存再，请重新输入')
               }
         })
   }
   const check = (t:string)=>{  
      Taro.setStorage({
            key:'token',
            data:t,
            success:()=>{
               Taro.redirectTo({url:`/pages/user-login-code/user_name`})
            }
      })
      
     } 
     const setWarn = (text:string)=>{
           setText(text)
           setPopShow(true)
     }
   return (<View className={style.box} >
         <PopUp show={pop_show} setShow={setPopShow} title={pop_text} />
         <View className={style.title_box}>
                     <Image src={title_img} className={style.title_icon} />
               </View>
               <View className={style.code_title}>输入网点邀请码</View>
               <View className={style.code_ipt_box}>
                     <CodeIpt onSuccess={()=>onSuccess()} setCode={setCode} />
               </View>
         <View className={style.bottom_btn_box}>
         <Button className={style.bottom_btn} onClick={onSuccess}>确认</Button>
         </View>
   </View>)
  }
