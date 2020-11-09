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
import PopInfo from '@/components/Pop-ups/info'
import Acount from './acount'
import Phone from './phone'
import empty from '@/components/empty'
export default ()=>{
      const [login_type,setType] = useState<boolean>(true)
      const [info_show,setInfoShow] = useState<boolean>(false)
      const [info_text,setInfoText] = useState<string>('')
      const [pop_show,setPopShow] = useState<boolean>(false)
      const [accout,setAccout] = useState<any>({
            username:'',
            password:''
      })
      const [tel,setTel] = useState<any>({
            phone:'',
            code:''
      })
   const handleUserLogin = ()=>{
        if(login_type){
            // 用户名密码登录
            if(accout.username==='15152241655'&&accout.password==='123456'){
                  // 登录成功
                  Taro.setStorageSync('login',true)
                  Taro.setStorageSync('user',{
                        name:'李云龙',
                        phone:'15152241655'
                  })
                  Taro.reLaunch({url:'/pages/first/index'})  
            }else {
                  // 登录失败
                  errorMessage('用户名或者密码错误，请重新输入')
            }
        }else {
              // 手机验证码登录
              
              if(tel.phone==='15152241655'&&tel.code==='123456'){
                  Taro.setStorageSync('login',true)
                    Taro.setStorageSync('user',{
                          name:'李云龙',
                          phone:'15152241655'
                    })
                  Taro.reLaunch({url:'/pages/first/index'})  
              }else {
                  // 登录失败
                  errorMessage('手机号或者验证码输入错误')
            }
        }
   }
   const errorMessage = (text)=>{
      setInfoText(text)
      setInfoShow(true)
   }
   const setEmpty = ()=>{
         // 设置输入空

   }
   return (<View className={style.box} >
         <PopUp show={pop_show} setShow={setPopShow} title={'邀请码不存在,请重新输入'} />
         <PopInfo title={info_text} show={info_show} setShow={setInfoShow} />
         <View style={style.top}>
             <View className={style.top}>
                 <View className={style.top_btn} onClick={()=>setType(true)} style={{color:login_type?'#003BA5':'#333'}}>账号密码登录</View>
                 <View className={style.top_line} />
                 <View className={style.top_btn} onClick={()=>setType(false)} style={{color:!login_type?'#003BA5':'#333'}}>手机号验证登录</View>

             </View>
         </View>
         {
               login_type?<Acount setData={setAccout} empty={login_type} />:<Phone setData={setTel} empty={!login_type} />
         }
         <View className={style.bottom_q} onClick={()=>errorMessage('请联系经销商解决')}>登录遇到问题?</View>
         <View className={style.bottom_btn_box}>
         <Button className={style.bottom_btn} onClick={handleUserLogin}>登录</Button>
         </View>
   </View>)
  }
