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
export default ()=>{
      const [login_step,setLoginStep] = useState<number>(0)
      const [code,setCode] = useState<string>('')
      const [pop_show,setPopShow] = useState<boolean>(false)
      useEffect(()=>{
            
      },[])
   const getUserPhone = (e:any)=>{
        console.log(e);
        // 获取手机号回调
       
   }
   const onSuccess = ()=>{ 
     if(code.length===6){
        handleSend()
     }
         
   }
   const handleSend = ()=>{
         // 验证邀请码
      if(code==='000000'){
            Taro.navigateTo({url:'/pages/user-register/user_name'})
      }else {
            // 失败弹窗
         setPopShow(true)
      }
1
   }
   return (<View className={style.box} >
         <PopUp show={pop_show} setShow={setPopShow} title={'邀请码不存在,请重新输入'} />
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
