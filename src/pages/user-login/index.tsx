import React, { Component,useState,useEffect } from 'react'
import {
View,
Button,
Input
} from '@tarojs/components'
import CodeIpt from './codeIpt'
import style from './index.module.less'
import PopUp from '@/components/Pop-ups/index'
export default ()=>{
      const [login_step,setLoginStep] = useState<number>(1)
      const [code,setCode] = useState<string>('')
      const [pop_show,setPopShow] = useState<boolean>(false)
   const getUserPhone = (e:any)=>{
        console.log(e);
        // 获取手机号回调
       
   }
   const onSuccess = (e)=>{
      setCode(e)
         
   }
   const handleSend = ()=>{
      // 失败弹窗
      // setPopShow(true) 

   }
   return (<View className={style.box} >
         <PopUp show={pop_show} setShow={setPopShow} title={'邀请码不存在,请重新输入'} />
         {login_step===0?(<Button type="primary" openType="getPhoneNumber" onGetPhoneNumber={(e)=>getUserPhone(e)}>授权登录</Button>):('')}
         {
               login_step===1?(
                  <>
                  <View className={style.code_title}>输入网点邀请码</View>
                  <View className={style.code_ipt_box}>
                        <CodeIpt onSuccess={(e)=>onSuccess(e)} />
                  </View>
                  </>
               ):('')
         }
         <View className={style.bottom_btn_box}>
         <Button className={style.bottom_btn} onClick={handleSend}>确认</Button>
         </View>
   </View>)
  }
